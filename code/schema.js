import * as yup from 'yup'
import i18next from './i18n'

// Локализованные сообщения об ошибках
yup.setLocale({
  mixed: {
    default: () => i18next.t('errors.empty'),
  },
  string: {
    url: () => i18next.t('errors.invalidUrl'),
  },
})

// Создаёт schema с проверкой дубликатов
const createSchema = (feeds) => {
  // Список уже добавленных URL
  const existingUrls = feeds.map((feed) => feed.url)

  // Возвращаем новую schema с проверкой дубликатов
  return yup.object().shape({
    url: yup
      .string()
      .typeError(i18next.t('errors.empty'))
      .required(i18next.t('errors.empty'))
      .url(i18next.t('errors.invalidUrl'))
      .notOneOf(existingUrls, i18next.t('errors.duplicate')),
  })
}

export default createSchema
