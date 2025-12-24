/* eslint-disable no-use-before-define */
import * as bootstrap from 'bootstrap';
import onChange from 'on-change';
import createSchema from './schema';
import {
  renderErrors,
  resetForm,
  renderFeeds,
  renderPosts,
} from './view';
import fetchRss from './fetcher';
import parseRss from './parsers';

// Генерирует уникальный ID для фидов и постов
const generateId = () => Math.random().toString(36).slice(2);

// Функция для открытия модального окна
const openPostModal = (post) => {
  // Заполняем заголовок модалки
  document.getElementById('postModalLabel').textContent = post.title;

  // Заполняем описание модалки
  document.getElementById('postModalBody').innerHTML = `
    <p>${post.description || ''}</p>
    <p><a href="${post.link}" target="_blank" class="btn btn-sm btn-primary">Читать полностью</a></p>
  `;

  // Открываем модалку через Bootstrap
  const modal = new bootstrap.Modal(document.getElementById('postModal'));
  modal.show();
};

// Загружает новые посты из одного фида и добавляет их в state
const updateFeed = async (feed, watchedState) => {
  try {
    // Скачиваем RSS с сервера
    const rssData = await fetchRss(feed.url);
    // Парсим XML и извлекаем посты
    const { posts } = parseRss(rssData);

    // Проходим по каждому посту
    posts.forEach(({ title, description, link }) => {
      // Проверяем, есть ли уже такой пост в state
      const exists = watchedState.posts.some((p) => p.link === link);
      // Если поста нет - добавляем его в начало списка
      if (!exists) {
        watchedState.posts.unshift({
          id: generateId(),
          feedId: feed.id,
          title,
          description,
          link,
        });
      }
    });
  } catch (error) {
    // Продолжаем обновлять остальные фиды
  }
};

// Обновляет все фиды одновременно
const updateAllFeeds = async (watchedState) => {
  // Promise.all ждёт, пока все обновления завершатся
  await Promise.all(
    watchedState.feeds.map((feed) => updateFeed(feed, watchedState)),
  );
};

export default () => {
  // Находим элементы на странице
  const elements = {
    form: document.getElementById('rss-form'),
    input: document.getElementById('rss-url'),
    button: document.querySelector('button[type="submit"]'),
    feedback: document.querySelector('.feedback'),
    feedsContainer: document.getElementById('feeds'),
    postsContainer: document.getElementById('posts'),
  };

  // Создаём состояние приложения
  const state = {
    feeds: [],
    posts: [],
    readPosts: [],
    errors: {},
    isLoading: false, // Флаг загрузки (для отключения кнопки)
  };

  // Создаём наблюдаемое состояние
  const watchedState = onChange(state, () => {
    // Каждый раз, когда state меняется, вызываем update()
    // eslint-disable-next-line no-use-before-define
    update();
  });

  // Функция для обновления отображения
  const update = () => {
    renderErrors(watchedState.errors, elements);
    renderFeeds(watchedState.feeds, elements.feedsContainer);
    renderPosts(watchedState.posts, elements.postsContainer, watchedState.readPosts);
    // Отключаем кнопку, если идёт загрузка
    elements.button.disabled = watchedState.isLoading;
  };

  // Обработчик на кнопки "Просмотр"
  elements.postsContainer.addEventListener('click', (e) => {
    // Проверяем, что кликнули именно на кнопку
    if (e.target.classList.contains('btn-outline-primary')) {
      // Берём ID поста
      const { postId } = e.target.dataset;

      // Находим пост в state
      const post = watchedState.posts.find((p) => p.id === postId);

      if (post) {
        // Открываем модалку
        openPostModal(post);

        // Отмечаем пост как прочитанный
        if (!watchedState.readPosts.includes(postId)) {
          watchedState.readPosts.push(postId);
        }
      }
    }
  });

  // Слушаем отправку формы
  elements.form.addEventListener('submit', async (e) => {
    // Останавливаем перезагрузку страницы
    e.preventDefault();

    // Получаем URL из инпута и удаляем пробелы
    const url = elements.input.value.trim();

    // Создаём schema с текущим списком фидов (для проверки дубликатов)
    const schema = createSchema(watchedState.feeds);

    try {
      // Валидируем URL
      await schema.validate({ url });

      // Очищаем старые ошибки
      watchedState.errors = {};
      // Показываем, что идёт загрузка
      watchedState.isLoading = true;

      // Скачиваем RSS с помощью прокси All Origins
      const rssData = await fetchRss(url);
      // Парсим XML и извлекаем информацию о фиде и постах
      const { feed, posts } = parseRss(rssData);

      // Генерируем уникальный ID для нового фида
      const feedId = generateId();

      // Добавляем новый фид в state
      watchedState.feeds.push({
        id: feedId,
        url,
        title: feed.title,
        description: feed.description,
      });

      // Добавляем все посты из этого фида в state
      posts.forEach(({ title, description, link }) => {
        watchedState.posts.push({
          id: generateId(),
          feedId, // Связываем пост с фидом
          title,
          description,
          link,
        });
      });

      // Очищаем форму и инпут
      resetForm(elements);
    } catch (error) {
      // Обрабатываем ошибки
      if (error.message === 'invalid_rss_format') {
        // Ошибка: RSS неправильного формата
        watchedState.errors.url = 'errors.invalid_rss_format';
      } else if (error.message === 'fetch_error') {
        // Ошибка: не удалось загрузить RSS с сервера
        watchedState.errors.url = 'errors.fetch_error';
      } else {
        // Ошибка валидации от Yup (дубликат, неправильный URL и т.д.)
        watchedState.errors.url = error.message;
      }

      // Перерисовываем страницу с ошибкой
      update();
    } finally {
      // Разблокируем кнопку после загрузки (в любом случае)
      watchedState.isLoading = false;
    }
  });

  // Запускаем автообновление с интервалом 5 секунд
  const scheduleUpdate = async () => {
    // Обновляем все фиды
    await updateAllFeeds(watchedState);
    // Запускаем следующее обновление через 5 сек после завершения
    setTimeout(scheduleUpdate, 5000);
  };

  // Запускаем первый цикл обновлений
  scheduleUpdate();
};
