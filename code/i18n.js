import i18next from 'i18next'
import ruResources from './locales/ru.json'
import enResources from './locales/en.json'

i18next.init({
  lng: 'ru',
  debug: false,
  resources: {
    ru: { translation: ruResources },
    en: { translation: enResources },
  },
})

export default i18next
