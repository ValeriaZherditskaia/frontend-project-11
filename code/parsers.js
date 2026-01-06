export const parseRss = (xmlString) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlString, 'application/xml')
  
  const errorNode = doc.querySelector('parsererror')
  if (errorNode) {
    const error = new Error(errorNode.textContent)
    error.code = 'invalidRss'
    throw error
  }
  
  const channel = doc.querySelector('channel')
  const feed = {
    title: channel.querySelector('title').textContent,
    description: channel.querySelector('description').textContent,
  }
  
  const items = Array.from(doc.querySelectorAll('item'))
  const posts = items.map((item) => ({
    title: item.querySelector('title').textContent,
    link: item.querySelector('link').textContent,
    description: item.querySelector('description').textContent,
  }))
  
  return { feed, posts }
}
