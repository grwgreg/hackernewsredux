function makeConstants(constants) {
  return constants.reduce((acc,el) => {
    acc[el] = el
    return acc 
  },{})
}
 
export default makeConstants([
  'LOAD_NEWS_START',
  'LOAD_NEWS_SUCCESS',
  'LOAD_NEWS_ERROR'
])
