import './style.css'
import 'bootstrap'
import i18next from './i18n.js'
import application from './application.js'

// Ждем инициализации i18next перед запуском
i18next.init({
  lng: 'ru',
  debug: false,
  resources: {
    ru: { translation: require('./locales/ru.json') },
    en: { translation: require('./locales/en.json') },
  },
}).then(() => {
  application()
}).catch(err => {
  console.error('i18n init failed:', err)
})
