import axios from 'axios';

const fetchRss = async (url) => {
  // Строим URL прокси All Origins
  const proxyUrl = 'https://allorigins.hexlet.app/get';

  // Указываем параметры запроса
  const params = {
    url,
    disableCache: true, // Отключение кеша
  };

  // Делаем GET-запрос через axios
  const response = await axios.get(proxyUrl, { params });

  // Возвращаем содержимое (XML-строку)
  return response.data.contents;
};
export default fetchRss;
