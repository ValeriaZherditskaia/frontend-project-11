const handleFormState = (elements, formState, i18n) => {
  const { input, feedback } = elements
  
  if (formState.valid) {
    input.classList.remove('is-invalid')
    feedback.classList.remove('text-danger')
    feedback.textContent = ''
  } else {
    input.classList.add('is-invalid')
    feedback.classList.add('text-danger')
    feedback.textContent = i18n.t(formState.errors[0])
  }
}

const handleLoadingState = (elements, loadingState, i18n) => {
  const { input, feedback, form } = elements
  const submitButton = form.querySelector('button[type="submit"]')

  switch (loadingState.status) {
    case 'pending':
      submitButton.disabled = true
      input.readOnly = true
      feedback.textContent = ''
      feedback.classList.remove('text-success', 'text-danger')
      break
    
    case 'succeeded':
      submitButton.disabled = false
      input.readOnly = false
      form.reset()
      input.focus()
      feedback.textContent = i18n.t('success.rss_added')
      feedback.classList.add('text-success')
      feedback.classList.remove('text-danger')
      break

    case 'failed':
      submitButton.disabled = false
      input.readOnly = false
      feedback.textContent = i18n.t(`errors.${loadingState.error}`)
      feedback.classList.add('text-danger')
      break

    case 'idle':
      submitButton.disabled = false
      input.readOnly = false
      feedback.textContent = ''
      feedback.classList.remove('text-success', 'text-danger')
      break
      
    default:
      break
  }
}

const renderFeeds = (container, feeds, i18n) => {
  if (feeds.length === 0) return
  
  container.innerHTML = ''
  const card = document.createElement('div')
  card.classList.add('card', 'border-0')
  
  const cardBody = document.createElement('div')
  cardBody.classList.add('card-body')
  const h2 = document.createElement('h2')
  h2.classList.add('card-title', 'h4')
  h2.textContent = i18n.t('ui.feeds')
  cardBody.append(h2)
  
  const ul = document.createElement('ul')
  ul.classList.add('list-group', 'list-group-flush')
  
  feeds.forEach((feed) => {
    const li = document.createElement('li')
    li.classList.add('list-group-item', 'border-0', 'border-bottom-0')
    
    const h3 = document.createElement('h3')
    h3.classList.add('h6', 'm-0')
    h3.textContent = feed.title
    
    const p = document.createElement('p')
    p.classList.add('m-0', 'small', 'text-black-50')
    p.textContent = feed.description
    
    li.append(h3, p)
    ul.append(li)
  })
  
  card.append(cardBody, ul)
  container.append(card)
}

const renderPosts = (container, posts, viewedIds, i18n) => {
  if (posts.length === 0) return
  
  container.innerHTML = ''
  const card = document.createElement('div')
  card.classList.add('card', 'border-0')
  
  const cardBody = document.createElement('div')
  cardBody.classList.add('card-body')
  const h2 = document.createElement('h2')
  h2.classList.add('card-title', 'h4')
  h2.textContent = i18n.t('ui.posts')
  cardBody.append(h2)
  
  const ul = document.createElement('ul')
  ul.classList.add('list-group', 'list-group-flush')
  
  posts.forEach((post) => {
    const li = document.createElement('li')
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-bottom-0')
    
    const a = document.createElement('a')
    a.href = post.link
    a.dataset.id = post.id
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    a.textContent = post.title
    
    if (viewedIds.has(post.id)) {
      a.classList.add('fw-normal', 'link-secondary')
    } else {
      a.classList.add('fw-bold')
    }
    
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.classList.add('btn', 'btn-outline-primary', 'btn-sm')
    btn.dataset.id = post.id
    btn.dataset.bsToggle = 'modal'
    btn.dataset.bsTarget = '#modal'
    btn.textContent = i18n.t('ui.preview')
    
    li.append(a, btn)
    ul.append(li)
  })
  
  card.append(cardBody, ul)
  container.append(card)
}

const renderModal = (elements, modalPostId, posts) => {
  if (!modalPostId) return
  
  const post = posts.find((p) => p.id === modalPostId)
  if (!post) return
  
  const { modal } = elements
  const title = modal.querySelector('.modal-title')
  const body = modal.querySelector('.modal-body')
  const link = modal.querySelector('.full-article')
  
  title.textContent = post.title
  
  body.textContent = post.description
  
  link.href = post.link
}

export const render = (elements, state, path, value, i18n) => {
  switch (path) {
    case 'form.valid':
    case 'form.errors':
      handleFormState(elements, state.form, i18n)
      break
    
    case 'loading.status':
      handleLoadingState(elements, state.loading, i18n)
      break
      
    case 'feeds':
      renderFeeds(elements.feedsContainer, value, i18n)
      break
      
    case 'posts':
    case 'ui.viewedPostIds':
      renderPosts(elements.postsContainer, state.posts, state.ui.viewedPostIds, i18n)
      break
      
    case 'ui.modalPostId':
      renderModal(elements, value, state.posts)
      break
      
    default:
      break
  }
}
