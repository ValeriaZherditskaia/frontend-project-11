/* eslint-disable no-use-before-define */
import * as bootstrap from 'bootstrap'
import onChange from 'on-change'
import i18next from './i18n'
import createSchema from './schema'
import {
  renderErrors,
  resetForm,
  renderFeeds,
  renderPosts,
  renderSuccess,
} from './view'
import fetchRss from './fetcher'
import parseRss from './parsers'


// Генерирует уникальный ID для фидов и постов
const generateId = () => Math.random().toString(36).slice(2)


// Функция для открытия модального окна
const openPostModal = (post) => {
  const titleEl = document.getElementById('postModalLabel')
  const bodyEl = document.getElementById('postModalBody')
  const footerEl = document.querySelector('.modal-footer')


  titleEl.textContent = post.title
  bodyEl.innerHTML = `<p>${post.description || ''}</p>`


  // Кнопки в footer
  footerEl.innerHTML = `
    <a
      href="${post.link}"
      target="_blank"
      rel="noopener noreferrer"
      class="btn btn-primary"
    >
      Читать полностью
    </a>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
      Закрыть
    </button>
  `


  const modal = new bootstrap.Modal(document.getElementById('postModal'))
  modal.show()
}


// Загружает новые посты
const updateFeedSilent = async (feed, posts) => {
  try {
    const rssData = await fetchRss(feed.url)
    const { posts: newPosts } = parseRss(rssData)


    newPosts.forEach(({ title, description, link }) => {
      const exists = posts.some(p => p.link === link)
      if (!exists) {
        posts.unshift({
          id: generateId(),
          feedId: feed.id,
          title,
          description,
          link,
        })
      }
    })
  }
  catch {
    // игнорируем
  }
}


// Обновляет все фиды
const updateAllFeedsSilent = async (feeds, posts) => {
  await Promise.all(feeds.map(feed => updateFeedSilent(feed, posts)))
}


export default () => {
  // Находим элементы на странице
  const elements = {
    form: document.getElementById('rss-form'),
    input: document.getElementById('url-input'),
    button: document.querySelector('button[type="submit"]'),
    feedback: document.querySelector('.invalid-feedback'),
    feedsContainer: document.getElementById('feeds'),
    postsContainer: document.getElementById('posts'),
  }


  // Состояние приложения
  const state = {
    feeds: [],
    posts: [],
    readPosts: [],
    errors: {},
    isLoading: false,
    successMessage: false,
  }


  const update = () => {
    // Показываем ошибки или успех
    if (state.successMessage) {
      renderSuccess(elements.feedback)
    }
    else {
      renderErrors(state.errors, elements)
    }


    renderFeeds(state.feeds, elements.feedsContainer)
    renderPosts(state.posts, elements.postsContainer, state.readPosts)
    elements.button.disabled = state.isLoading
  }


  // Наблюдаемое состояние
  const watchedState = onChange(state, () => {
    update()
  })


  // Обработчик клика по кнопкам "Просмотр"
  elements.postsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-outline-primary')) {
      const { postId } = e.target.dataset
      const post = watchedState.posts.find(p => p.id === postId)


      if (post) {
        openPostModal(post)


        if (!watchedState.readPosts.includes(postId)) {
          watchedState.readPosts.push(postId)
        }
      }
    }
  })


  // Обработчик отправки формы
  elements.form.addEventListener('submit', async (e) => {
    e.preventDefault()


    const url = elements.input.value.trim()
    const schema = createSchema(watchedState.feeds)


    try {
      await schema.validate({ url })


      watchedState.errors = {}
      watchedState.isLoading = true


      const rssData = await fetchRss(url)
      const { feed, posts } = parseRss(rssData)


      const feedId = generateId()


      watchedState.feeds.push({
        id: feedId,
        url,
        title: feed.title,
        description: feed.description,
      })


      posts.forEach(({ title, description, link }) => {
        watchedState.posts.push({
          id: generateId(),
          feedId,
          title,
          description,
          link,
        })
      })


      resetForm(elements)
      watchedState.isLoading = false


      // Показываем сообщение об успехе
      watchedState.successMessage = true
      update()
    }
    catch (error) {
      watchedState.isLoading = false
      watchedState.successMessage = false


      if (error.message === 'invalid_rss_format') {
        watchedState.errors.url = i18next.t('errors.invalidRss')
      }
      else if (error.message === 'fetch_error') {
        watchedState.errors.url = i18next.t('errors.networkError')
      }
      else if (error.message === 'duplicate') {
        watchedState.errors.url = i18next.t('errors.duplicate')
      }


      update()
    }
  })


  // Обработчик на изменение инпута
  elements.input.addEventListener('input', async function () {
    const url = elements.input.value.trim()
    const schema = createSchema(watchedState.feeds)


    try {
      await schema.validate({ url })
      watchedState.errors = {}
    }
    catch (error) {
      watchedState.errors.url = error.message
    }
  })


  // Автообновление
  const scheduleUpdate = async () => {
    await updateAllFeedsSilent(watchedState.feeds, watchedState.posts)
    // Ручное обновление постов
    renderPosts(
      watchedState.posts,
      elements.postsContainer,
      watchedState.readPosts,
    )
    setTimeout(scheduleUpdate, 5000)
  }


  scheduleUpdate()
}
