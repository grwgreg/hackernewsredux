import c from '../constants'
import fetch from 'isomorphic-fetch'
import { notify } from './notify'

const endPoint = c.URL + 'item'

function loadCommentsStart() {
  return {
    type: c.LOAD_COMMENTS_START,
    payload: {}
  }
}

function loadCommentsSuccess(comments) {
console.log(comments)
  return {
    type: c.LOAD_COMMENTS_SUCCESS,
    payload: {
      comments
    }
  }
}

function loadCommentsError(err) {
  return (dispatch) => {
    dispatch(notify('Woops, an error occurred'))
    dispatch({
      type: c.LOAD_COMMENTS_ERROR,
      payload: {
        err
      }
    })
  }
}

function setCommentsCurrentId(id) {
  return {
    type: c.SET_COMMENTS_CURRENT_ID,
    payload: {
      id
    }
  }
}

function fetchComments(commentIds) {
  return Promise.all(commentIds.map(id=> {
    let comment
    return fetch(`${endPoint}/${id}.json` )
      .then(res=>res.json())
      .then(com => {
        comment = com
        if (!comment.kids) return []//base case
        return fetchComments(comment.kids)
      })
      .then(childComments=> ({
        id,
        comment,
        childComments
      }))
  }))
}

export function loadComments(id) {
  return (dispatch, getState) => {
    const state = getState()
    if (state.comments.items[id]) {
      dispatch(setCommentsCurrentId(id))
    } else {
      dispatch(loadCommentsStart())
      return fetchComments([id])
        .then(([comments]) => dispatch(loadCommentsSuccess(comments)))
        .catch(err => dispatch(loadCommentsError(err)))
    }
  }
}
