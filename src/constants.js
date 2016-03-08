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
  'LOAD_NEWS_INCREMENT_DISPLAYING'
])

const newsTypes = makeConstants([
  'TOP_STORIES',
  'SHOW_STORIES'
])

export default Object.assign({}, newsTypes, actionTypes, {
  PER_PAGE: 30,
  URL: 'https://hacker-news.firebaseio.com/v0/'
})
