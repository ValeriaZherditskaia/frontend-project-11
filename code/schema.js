import * as yup from 'yup'

export const createSchema = (existingFeeds) => {
  const urls = existingFeeds.map(feed => feed.url)

  return yup.object().shape({
    url: yup
      .string()
      .required('validation.required')
      .url('validation.url')
      .notOneOf(urls, 'validation.duplicate'),
  })
}
