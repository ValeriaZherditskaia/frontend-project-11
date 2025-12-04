import * as yup from 'yup';
import i18next from './i18n';

yup.setLocale({
  mixed: {
    typeError: () => i18next.t('errors.url.typeError'),
  },
  string: {
    url: () => i18next.t('errors.url.url'),
  },
});

const schema = yup.object().shape({
  url: yup
    .string()
    .required(i18next.t('errors.url.typeError'))
    .url(i18next.t('errors.url.required'))
    .typeError(i18next.t('errors.url.url')),
});

export default schema;
