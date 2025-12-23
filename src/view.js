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
const renderPosts = (posts, container) => {
  // Создаём локальную переменную для параметра
  const el = container;
  // Очищаем контейнер
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
    item.classList.add('list-group-item');

    // Создаём ссылку на пост
    const link = document.createElement('a');
    link.href = post.link;
    link.target = '_blank'; // Открыть в новой вкладке
    link.rel = 'noopener noreferrer'; // Безопасность
    link.textContent = post.title;

    // Добавляем в элемент списка
    item.appendChild(link);
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
