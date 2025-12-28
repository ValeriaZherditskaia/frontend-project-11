import axios from 'axios'

const fetchRss = async (url) => {
  const proxyUrl = 'https://allorigins.hexlet.app/get'

  const params = {
    url,
    disableCache: true,
  }

  try {
    const response = await axios.get(proxyUrl, { params })

    if (response.data.contents === null) {
      throw new Error('fetch_error')
    }

    return response.data.contents
  }
  catch {
    throw new Error('fetch_error')
  }
}

export default fetchRss
