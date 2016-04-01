import c from '../constants'
const initialState = {
  loading: false,
  items: {},
  currentId: ''
}

function comments(state = initialState, action) {

  const comments = action.payload && action.payload.comments

  switch (action.type) {

    case c.LOAD_COMMENTS_START:
      return Object.assign({}, state, {
        loading: true
      })

    case c.SET_COMMENTS_CURRENT_ID:
      return Object.assign({}, state, {
        loading: false,
        currentId: action.payload.id
      })

    case c.LOAD_COMMENTS_SUCCESS:
      return Object.assign({}, state, {
        items: Object.assign({}, state.items, {[comments.id]: comments}),
        currentId: comments.id,
        loading: false
      })

    case c.LOAD_COMMENTS_ERROR:
      return Object.assign({}, state, {
        loading: false
      })

    default:
      return state
  }
}

module.exports = {
  comments
}
