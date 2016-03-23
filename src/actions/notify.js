import c from '../constants'
export function notify(msg) {
  return {
    type: c.NOTIFY,
    payload: {
      msg
    }
  }
}

export function hideNotify() {
  return {
    type: c.NOTIFY_HIDE
  }
}
