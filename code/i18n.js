import i18next from 'i18next'
import ruResources from './locales/ru.json'
import enResources from './locales/en.json'

const i18n = i18next.createInstance()

export default i18n.init({
  lng: 'ru',
  debug: false,
  resources: {
    ru: { translation: ruResources },
    en: { translation: enResources },
  },
}).then(() => i18n)
