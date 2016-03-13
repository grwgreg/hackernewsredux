import c from '../constants'
import fetch from 'isomorphic-fetch'

const endPoint = c.URL + 'item'

function loadCommentsStart() {
  return {
    type: c.LOAD_COMMENTS_START,
    payload: {}
  }
}

function loadCommentsSuccess(comments) {
  return {
    type: c.LOAD_COMMENTS_SUCCESS,
    payload: {
      comments
    }
  }
}

function loadCommentsError(err) {
  return {
    type: c.LOAD_COMMENTS_ERROR,
    payload: {
      err
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
        if (!comment.kids) return Promise.resolve([])//base case
        return fetchComments(comment.kids)
      })
      .then(childComments=> ({
        id,
        comment,
        childComments
      }))
//TODO some error handling would be good
  }))
}

export function loadComments(id) {
  return dispatch => {
    dispatch(loadCommentsStart())
    fetchComments([id]).then(([comments]) => {
      dispatch(loadCommentsSuccess(comments))
    })
  }
}
