import './style.css'
import 'bootstrap'
import i18nPromise from './i18n.js'
import application from './application.js'

i18nPromise.then((i18n) => {
  application(i18n)
})
