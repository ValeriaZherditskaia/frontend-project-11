/* eslint-disable no-param-reassign */
import i18next from './i18n';

// Функция, которая подсвечивает инпут красным
const renderErrors = (errors, inputElements) => {
  const el = inputElements;

  // Очищаем все ошибки перед новой проверкой
  el.input.classList.remove('is-invalid');
  el.feedback.textContent = '';

  // Если есть новые ошибки — показываем
  if (errors && errors.url) {
    el.input.classList.add('is-invalid');
    el.feedback.textContent = i18next.t(errors.url);
  }
};

// Функция, которая очищает форму
const resetForm = (formElements) => {
  const el = formElements;

  el.form.reset(); // Очищает все инпуты
  el.input.classList.remove('is-invalid'); // Убирает красную рамку
  el.feedback.textContent = ''; // Убирает текст ошибки
  el.input.focus(); // Фокус на инпут (курсор туда)
};

// Отображение списка фидов
const renderFeeds = (feeds, container) => {
  const el = container;
  // Очищаем контейнер
  el.innerHTML = '';

  // Если нет фидов - выходим
  if (feeds.length === 0) {
    return;
  }

  // Создаём заголовок
  const title = document.createElement('h2');
  title.textContent = 'Потоки';

  // Создаём список
  const feedList = document.createElement('ul');
  feedList.classList.add('list-group');

  // Для каждого фида создаём элемент
  feeds.forEach((feed) => {
    const item = document.createElement('li');
    item.classList.add('list-group-item');

    // Заголовок фида
    const feedTitle = document.createElement('h3');
    feedTitle.textContent = feed.title;

    // Описание фида
    const feedDesc = document.createElement('p');
    feedDesc.textContent = feed.description;

    // Добавляем в элемент списка
    item.appendChild(feedTitle);
    item.appendChild(feedDesc);
    feedList.appendChild(item);
  });

  // Добавляем в контейнер
  el.appendChild(title);
  el.appendChild(feedList);
};

// Отображение списка постов
const renderPosts = (posts, container, readPosts = []) => {
  // Создаём локальную переменную
  const el = container;

  el.innerHTML = '';

  // Если нет постов - выходим
  if (posts.length === 0) {
    return;
  }

  // Создаём заголовок
  const title = document.createElement('h2');
  title.textContent = 'Посты';

  // Создаём список
  const postList = document.createElement('ul');
  postList.classList.add('list-group');

  // Для каждого поста создаём элемент
  posts.forEach((post) => {
    const item = document.createElement('li');
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

    // Прочитан ли пост
    const isRead = readPosts.includes(post.id);

    // Создаём контейнер для заголовка и ссылки
    const linkContainer = document.createElement('div');
    linkContainer.style.flex = '1';

    // Создаём ссылку на пост
    const link = document.createElement('a');
    link.href = post.link;
    link.target = '_blank'; // Открыть в новой вкладке
    link.rel = 'noopener noreferrer'; // Безопасность
    link.textContent = post.title;

    // Если пост НЕ прочитан - жирный шрифт
    // Если пост прочитан - обычный серый шрифт
    if (isRead) {
      link.classList.add('fw-normal', 'text-muted');
    } else {
      link.classList.add('fw-bold');
    }

    linkContainer.appendChild(link);

    // Создаём кнопку "Просмотр"
    const viewBtn = document.createElement('button');
    viewBtn.type = 'button';
    viewBtn.classList.add('btn', 'btn-sm', 'btn-outline-primary');
    viewBtn.textContent = 'Просмотр';
    viewBtn.dataset.postId = post.id; // Сохраняем ID поста в атрибут

    // Добавляем в элемент списка
    item.appendChild(linkContainer);
    item.appendChild(viewBtn);
    postList.appendChild(item);
  });

  // Добавляем в контейнер
  el.appendChild(title);
  el.appendChild(postList);
};

export {
  renderErrors,
  resetForm,
  renderFeeds,
  renderPosts,
};
