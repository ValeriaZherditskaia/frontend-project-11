import i18next from './i18n';

// Функция, которая подсвечивает инпут красным
const renderErrors = (errors, inputElements) => {
  const el = inputElements;

  // Очищаем все ошибки перед новой проверкой
  el.input.classList.remove('is-invalid');
  el.feedback.textContent = '';

  // Если есть новые ошибки — показываем
  if (errors && errors.url) {
    el.input.classList.add('is-invalid');
    el.feedback.textContent = i18next.t(errors.url);
  }
};

// Функция, которая очищает форму
const resetForm = (formElements) => {
  const el = formElements;

  el.form.reset(); // Очищает все инпуты
  el.input.classList.remove('is-invalid'); // Убирает красную рамку
  el.feedback.textContent = ''; // Убирает текст ошибки
  el.input.focus(); // Фокус на инпут (курсор туда)
};

export { renderErrors, resetForm };
