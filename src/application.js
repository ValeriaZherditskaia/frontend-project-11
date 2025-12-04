import schema from './schema';
import { renderErrors, resetForm } from './view';
import i18next from './i18n';

export default () => {
  // Находим элементы на странице
  const elements = {
    form: document.getElementById('rss-form'),
    input: document.getElementById('rss-url'),
    button: document.querySelector('button[type="submit"]'),
    feedback: document.querySelector('.feedback'),
  };

  // Состояние приложения
  const state = {
    feeds: [],
    errors: {},
    isValid: false,
  };

  // Функция для обновления отображения
  const update = () => {
    renderErrors(state.errors, elements);
  };

  // Слушаем отправку формы
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const url = elements.input.value.trim();

    // Проверяем URL
    schema
      .validate({ url })
      .then(() => {
        // URL прошёл проверку
        const isDuplicate = state.feeds.includes(url);

        if (isDuplicate) {
          state.errors = { url: 'errors.duplicate' };
        } else {
          state.feeds.push(url);
          state.errors = {};
          resetForm(elements);
        }

        update();
      })
      .catch((validationError) => {
        let errorCode = 'errors.url.url'; // по умолчанию

        if (validationError.message === i18next.t('errors.url.required')) {
          errorCode = 'errors.url.required';
        } else if (validationError.message === i18next.t('errors.url.url')) {
          errorCode = 'errors.url.url';
        } else if (validationError.message === i18next.t('errors.url.typeError')) {
          errorCode = 'errors.url.typeError';
        }

        state.errors = { url: errorCode };
        update();
      });
  });
};
