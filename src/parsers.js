const parseRss = (xmlString) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

  const parserError = xmlDoc.querySelector('parsererror');
  if (parserError) {
    throw new Error('invalid_rss_format');
  }

  // Извлекаем информацию о фиде
  const channelElement = xmlDoc.querySelector('channel');
  if (!channelElement) {
    throw new Error('invalid_rss_format');
  }

  // Извлекаем данные фида
  const titleElement = channelElement.querySelector('title');
  const feedTitle = titleElement ? titleElement.textContent.trim() : 'Без заголовка';
  const descriptionElement = channelElement.querySelector('description');
  const feedDescription = descriptionElement ? descriptionElement.textContent.trim() : 'Без описания';

  // Извлекаем все посты
  const itemElements = channelElement.querySelectorAll('item');
  const posts = [];
  itemElements.forEach((item) => {
    const postTitleElement = item.querySelector('title');
    const postTitle = postTitleElement ? postTitleElement.textContent.trim() : 'Без заголовка';
    const postLinkElement = item.querySelector('link');
    const postLink = postLinkElement ? postLinkElement.textContent.trim() : '';
    posts.push({
      title: postTitle,
      link: postLink,
    });
  });

  return {
    feed: {
      title: feedTitle,
      description: feedDescription,
    },
    posts,
  };
};
export default parseRss;
