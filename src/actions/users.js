import c from '../constants'
import fetch from 'isomorphic-fetch'

const endPoint = c.URL + 'user'

function loadUserStart() {
  return {
    type: c.LOAD_USERS_START,
    payload: {}
  }
}

function setUserCurrentId(id) {
  return {
    type: c.SET_USERS_CURRENT_ID,
    payload: {
      id
    }
  }
}

function loadUserSuccess(user) {
  return {
    type: c.LOAD_USERS_SUCCESS,
    payload: {
      user
    }
  }
}

function loadUserError(err) {
  return {
    type: c.LOAD_USERS_ERROR,
    payload: {
      err
    }
  }
}

function fetchUser(id) {
  return fetch(`${endPoint}/${id}.json` )
    .then(res=>res.json())
}

export function loadUser(id) {
  return (dispatch, getState) => {
    const state = getState()
    if (state.users.items[id]) {
      dispatch(setUserCurrentId(id))
    } else {
      dispatch(loadUserStart())
      return fetchUser(id)
        .then(user => {
          dispatch(loadUserSuccess(user))
        })
        .catch(err => {
          dispatch(loadUserError(user))
        })
    }
  }
}
