import axios from 'axios'

const PROXY_URL = 'https://allorigins.hexlet.app/get'

export const fetchRss = (url) => {
  return axios.get(PROXY_URL, {
    params: {
      disableCache: true,
      url,
    },
  }).then((response) => {
    if (!response.data.contents) {
      const error = new Error('Network error')
      error.code = 'networkError'
      throw error
    }
    return response.data.contents
  }).catch(() => {
    const error = new Error('Network error')
    error.code = 'networkError'
    throw error
  })
}
