function makeConstants(constants) {
  return constants.reduce((acc,el) => {
    acc[el] = el
    return acc
  },{})
}

const actionTypes = makeConstants([
  'LOAD_NEWS_START',
  'LOAD_NEWS_SUCCESS',
  'LOAD_NEWS_ERROR',
  'LOAD_NEWS_INCREMENT_DISPLAYING',
  'SET_NEWS_LOADABLE_ITEMS',
  'LOAD_COMMENTS_START',
  'LOAD_COMMENTS_SUCCESS',
  'LOAD_COMMENTS_ERROR',
  'SET_COMMENTS_CURRENT_ID',
  'LOAD_USERS_START',
  'LOAD_USERS_SUCCESS',
  'LOAD_USERS_ERROR',
  'SET_USERS_CURRENT_ID',
  'NOTIFY',
  'NOTIFY_HIDE'
])

const newsTypes = makeConstants([
  'TOP_STORIES',
  'SHOW_STORIES',
  'ASK_STORIES',
  'JOB_STORIES',
  'NEW_STORIES'
])

export default Object.assign({}, newsTypes, actionTypes, {
  PER_PAGE: 30,
  URL: 'https://hacker-news.firebaseio.com/v0/'
})
