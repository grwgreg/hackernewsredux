import c from '../constants'
const initialState = {
  loading: false,
  currentlyDisplaying: 0,
  items: []
}
function newsItems(state = initialState, action) {
                               
  switch (action.type) {

    case c.LOAD_NEWS_START:
      return Object.assign({}, state, {
        loading: true,
        currentlyDisplaying: action.payload.initialLoad ? 0 : state.currentlyDisplaying
      })

    case c.LOAD_NEWS_SUCCESS:
      return Object.assign({}, state, {
        items: [...state.items, ...action.payload.data],
        loading: false,
        currentlyDisplaying: state.currentlyDisplaying + action.payload.data.length
      }) 

    case c.LOAD_NEWS_INCREMENT_DISPLAYING:
      return Object.assign({}, state, {
        currentlyDisplaying: state.currentlyDisplaying + action.payload,
        loading: false
      })
    
    default:
      return state
  }
} 

module.exports = {
  newsItems
}
