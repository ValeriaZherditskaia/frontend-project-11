import axios from 'axios';

const fetchRss = async (url) => {
  // Строим URL прокси All Origins
  const proxyUrl = 'https://allorigins.hexlet.app/get';

  // Указываем параметры запроса
  const params = {
    url, // URL RSS фида который нужно загрузить
    disableCache: true, // Отключение кеша для получения свежих данных
  };

  try {
    // Пытаемся выполнить GET-запрос через axios
    const response = await axios.get(proxyUrl, { params });

    // Проверяем есть ли ошибка в ответе прокси
    if (!response.data.contents) {
      // Если прокси вернул пусто или ошибку (contents = null)
      const error = new Error('fetch_error');
      throw error;
    }

    // Возвращаем содержимое (XML-строку)
    return response.data.contents;
  } catch (error) {
    // Если произойдёт ошибка сети, timeout или другая ошибка axios
    const err = new Error('fetch_error');
    throw err;
  }
};

export default fetchRss;
