/* eslint-disable no-param-reassign */
import i18next from './i18n'

// Подсветка инпута и вывод ошибок
const renderErrors = (errors, inputElements) => {
  const el = inputElements

  el.input.classList.remove('is-invalid')
  el.feedback.textContent = ''
  el.feedback.classList.remove('text-success')
  el.feedback.style.display = 'none'

  if (errors && errors.url) {
    el.input.classList.add('is-invalid')
    el.feedback.textContent = errors.url
    el.feedback.classList.add('text-danger')
    el.feedback.style.display = 'block'
  }
}

// Очистка формы
const resetForm = (formElements) => {
  const el = formElements

  el.form.reset()
  el.input.classList.remove('is-invalid')
  el.feedback.textContent = ''
  el.feedback.classList.remove('text-danger')
  el.feedback.classList.remove('text-success')
  el.feedback.style.display = 'none'
  el.input.focus()
}

// Успешная загрузка RSS
const renderSuccess = (container) => {
  container.textContent = i18next.t('success')
  container.classList.remove('text-danger')
  container.classList.add('text-success')
  container.style.display = 'block'
}

// Отображение списка фидов
const renderFeeds = (feeds, container) => {
  const el = container
  el.innerHTML = ''

  if (feeds.length === 0) {
    return
  }

  const title = document.createElement('h2')
  title.textContent = i18next.t('feeds')
  title.style.fontSize = '1.4rem'
  title.style.marginBottom = '1.5rem'
  title.style.marginTop = '0'

  const feedList = document.createElement('ul')
  feedList.classList.add('list-group')
  feedList.style.listStyle = 'none'
  feedList.style.padding = '0'
  feedList.style.margin = '0'

  feeds.forEach((feed) => {
    const item = document.createElement('li')
    item.style.marginBottom = '2rem'
    item.style.border = 'none'
    item.style.padding = '0'

    const feedTitle = document.createElement('h3')
    feedTitle.textContent = feed.title
    feedTitle.style.fontSize = '1rem'
    feedTitle.style.marginBottom = '0.5rem'
    feedTitle.style.fontWeight = '600'
    feedTitle.style.margin = '0'

    const feedDesc = document.createElement('p')
    feedDesc.textContent = feed.description
    feedDesc.style.fontSize = '0.875rem'
    feedDesc.style.color = '#666'
    feedDesc.style.marginBottom = '0'
    feedDesc.style.lineHeight = '1.4'
    feedDesc.style.margin = '0'

    item.appendChild(feedTitle)
    item.appendChild(feedDesc)
    feedList.appendChild(item)
  })

  el.appendChild(title)
  el.appendChild(feedList)
}

// Отображение списка постов
const renderPosts = (posts, container, readPosts = []) => {
  const el = container
  el.innerHTML = ''

  if (posts.length === 0) {
    return
  }

  const title = document.createElement('h2')
  title.textContent = i18next.t('posts')
  title.style.fontSize = '1.4rem'
  title.style.marginBottom = '1.5rem'
  title.style.marginTop = '0'

  const postList = document.createElement('ul')
  postList.classList.add('list-group')
  postList.style.border = 'none'
  postList.style.padding = '0'
  postList.style.margin = '0'

  posts.forEach((post) => {
    const item = document.createElement('li')
    item.classList.add(
      'd-flex',
      'justify-content-between',
      'align-items-flex-start',
    )
    item.style.border = 'none'
    item.style.padding = '0'
    item.style.marginBottom = '0.75rem'
    item.style.backgroundColor = 'transparent'
    item.style.gap = '1rem'

    const isRead = readPosts.includes(post.id)

    const link = document.createElement('a')
    link.href = post.link
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.textContent = post.title
    link.style.fontSize = '1rem'
    link.style.lineHeight = '1.5'
    link.style.wordWrap = 'break-word'
    link.style.display = 'block'
    link.style.flex = '1'
    link.style.minWidth = '0'

    if (isRead) {
      link.classList.add('fw-normal', 'text-muted')
    } 
    else {
      link.classList.add('fw-bold')
    }

    const viewBtn = document.createElement('button')
    viewBtn.type = 'button'
    viewBtn.classList.add('btn', 'btn-sm', 'btn-outline-primary')
    viewBtn.textContent = i18next.t('preview')
    viewBtn.dataset.postId = post.id
    viewBtn.style.flexShrink = '0'
    viewBtn.style.whiteSpace = 'nowrap'

    item.appendChild(link)
    item.appendChild(viewBtn)
    postList.appendChild(item)
  })

  el.appendChild(title)
  el.appendChild(postList)
}

export {
  renderErrors, resetForm, renderFeeds, renderPosts, renderSuccess,
}
