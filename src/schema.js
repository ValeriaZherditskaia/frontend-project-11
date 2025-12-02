import * as yup from 'yup';

const schema = yup.object().shape({
  url: yup
    .string()
    .required('URL не может быть пустым')
    .url('Введите правильный URL')
    .typeError('URL должен быть строкой'),
});
export default schema;
