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

export default Object.assign({}, actionTypes, {
  PER_PAGE: 30,
  URL: 'https://hacker-news.firebaseio.com/v0/'
})
