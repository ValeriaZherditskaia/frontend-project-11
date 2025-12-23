import * as yup from 'yup';
import i18next from './i18n';

// Локализованные сообщения об ошибках
yup.setLocale({
  mixed: {
    typeError: () => i18next.t('errors.url.typeError'),
  },
  string: {
    url: () => i18next.t('errors.url.url'),
  },
});

// Создаёт schema с проверкой дубликатов
const createSchema = (feeds) => {
  // Список уже добавленных URL
  const existingUrls = feeds.map((feed) => feed.url);

  // Возвращаем новую schema с проверкой дубликатов
  return yup.object().shape({
    url: yup
      .string() // Проверка: это строка?
      .typeError(i18next.t('errors.url.typeError')) // Сообщение, если не строка
      .required(i18next.t('errors.url.required')) // Проверка: не пустой?
      .url(i18next.t('errors.url.url')) // Проверка: валидный URL?
      .notOneOf(existingUrls, i18next.t('errors.duplicate')), // Проверка: не дубликат?
  });
};
export default createSchema;
