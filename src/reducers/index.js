import c from '../constants'
const initialState = {
  loading: false,
  currentlyDisplaying: 0,
  totalItems: 0,
  items: []
}

function newsReducer(newsType, state = initialState, action) {
                               
  switch (action.type) {

    case c.LOAD_NEWS_START:
      if (action.payload.newsType !== newsType) return state
      return Object.assign({}, state, {
        loading: true,
        currentlyDisplaying: action.payload.initialLoad ? 0 : state.currentlyDisplaying
      })

    case c.LOAD_NEWS_SUCCESS:
      if (action.payload.newsType !== newsType) return state
      return Object.assign({}, state, {
        items: [...state.items, ...action.payload.data],
        loading: false,
        currentlyDisplaying: state.currentlyDisplaying + action.payload.data.length
      }) 

    case c.LOAD_NEWS_INCREMENT_DISPLAYING:
      if (action.payload.newsType !== newsType) return state
      return Object.assign({}, state, {
        currentlyDisplaying: state.currentlyDisplaying + action.payload.count,
        loading: false
      })

    case c.SET_NEWS_TOTAL_ITEMS:
      if (action.payload.newsType !== newsType) return state
      return Object.assign({}, state, {
        totalItems: action.payload.count
      })
    
    default:
      return state
  }
} 

module.exports = {
  [c.TOP_STORIES]: newsReducer.bind(null, c.TOP_STORIES),
  [c.SHOW_STORIES]: newsReducer.bind(null, c.SHOW_STORIES),
  [c.ASK_STORIES]: newsReducer.bind(null, c.ASK_STORIES),
  [c.JOB_STORIES]: newsReducer.bind(null, c.JOB_STORIES),
  [c.NEW_STORIES]: newsReducer.bind(null, c.NEW_STORIES)
}
