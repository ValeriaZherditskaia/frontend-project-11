import onChange from 'on-change'
import { uniqueId } from 'lodash'
import { fetchRss } from './fetcher.js'
import { parseRss } from './parsers.js'
import { createSchema } from './schema.js'
import { render } from './view.js'

export default () => {
  const state = {
    form: {
      url: '',
      valid: true,
      errors: [],
    },
    loading: {
      status: 'idle',
      error: null,
    },
    feeds: [],
    posts: [],
    ui: {
      viewedPostIds: new Set(),
      modalPostId: null,
    },
  }

  const elements = {
    form: document.getElementById('rss-form'),
    input: document.getElementById('url-input'),
    feedback: document.querySelector('.feedback'),
    postsContainer: document.querySelector('.posts'),
    feedsContainer: document.querySelector('.feeds'),
    modal: document.getElementById('modal'),
  }

  const watchedState = onChange(state, (path, value) => {
    render(elements, state, path, value)
  })

  const updateFeeds = () => {
    const promises = state.feeds.map((feed) => fetchRss(feed.url)
      .then((xml) => {
        const { posts } = parseRss(xml)
        const newPosts = posts.filter((post) => 
          !state.posts.some((existing) => existing.link === post.link)
        )

        if (newPosts.length > 0) {
          const postsWithIds = newPosts.map((post) => ({
            ...post,
            id: uniqueId(),
            feedId: feed.id,
          }))
          watchedState.posts.unshift(...postsWithIds)
        }
      })
      .catch((e) => console.error('Update error', e)))

    Promise.all(promises).finally(() => {
      setTimeout(updateFeeds, 5000)
    })
  }

  setTimeout(updateFeeds, 5000)

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const url = formData.get('url').trim()

    watchedState.form.valid = true
    watchedState.form.errors = []
    
    const schema = createSchema(state.feeds)

    schema.validate({ url })
      .then(() => {
        watchedState.form.valid = true
        watchedState.form.errors = []
        watchedState.loading.status = 'pending'
        watchedState.loading.error = null

        return fetchRss(url)
      })
      .then((xml) => {
        const { feed, posts } = parseRss(xml)
        
        const feedId = uniqueId()
        watchedState.feeds.unshift({ ...feed, id: feedId, url })
        
        const postsWithIds = posts.map((post) => ({
          ...post,
          id: uniqueId(),
          feedId,
        }))
        watchedState.posts.unshift(...postsWithIds)

        watchedState.loading.status = 'succeeded'
      })
      .catch((error) => {
        if (error.name === 'ValidationError') {
          watchedState.form.valid = false
          watchedState.form.errors = error.errors
        } else {
          watchedState.loading.status = 'failed'
          watchedState.loading.error = error.code || 'errors.fetch_error'
        }
      })
  })

  elements.postsContainer.addEventListener('click', (e) => {
    const { id } = e.target.dataset
    if (id) {
      watchedState.ui.modalPostId = id
      watchedState.ui.viewedPostIds.add(id)
    }
  })
}
