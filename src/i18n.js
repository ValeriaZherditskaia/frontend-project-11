import i18next from 'i18next';
import resources from './locales/ru.json';

i18next.init({
  lng: 'ru',
  resources: {
    ru: {
      translation: resources,
    },
  },
});

export default i18next;
