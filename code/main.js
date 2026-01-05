import './style.css'
import 'bootstrap'
import i18n from './i18n.js'
import application from './application.js'

// Ждем инициализации i18n, потом запускаем приложение
i18n.init().then(() => {
  application()
})
