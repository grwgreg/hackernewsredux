import c from '../constants'
const initialState = {
  msg: '',
  visible: false
}

function notify(state = initialState, action) {

  switch (action.type) {

    case c.NOTIFY:
      return Object.assign({}, state, {
        msg: action.payload.msg,
        visible: true
      })

    case c.NOTIFY_HIDE:
      return Object.assign({}, state, {
        msg: '',
        visible: false
      })

    default:
      return state
  }
}

module.exports = {
  notify
}
