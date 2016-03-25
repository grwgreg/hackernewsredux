import c from '../constants'
const initialState = {
  loading: false,
  items: {},
  currentId: undefined
}

function users(state = initialState, action) {

  const user = action.payload && action.payload.user

  switch (action.type) {

    case c.LOAD_USERS_START:
      return Object.assign({}, state, {
        loading: true
      })

    case c.SET_USERS_CURRENT_ID:
      return Object.assign({}, state, {
        loading: false,
        currentId: action.payload.id
      })

    case c.LOAD_USERS_SUCCESS:
      return Object.assign({}, state, {
        items: Object.assign({}, state.items, {[user.id]: user}),
        currentId: user.id,
        loading: false
      })

    case c.LOAD_USERS_ERROR:
      return Object.assign({}, state, {
        loading: false
      })

    default:
      return state
  }
}

module.exports = {
  users
}
