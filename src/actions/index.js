import t from './actiontypes'
import fetch from 'isomorphic-fetch'

const URL = 'https://hacker-news.firebaseio.com/v0/'
const PER_PAGE = 30

function loadNewsSuccess(data) {
  return {
    type: t.LOAD_NEWS_SUCCESS,
    payload: data
  }
}

function loadNewsError(err) {
  return {
    type: t.LOAD_NEWS_ERROR,
    payload: err
  }
}

export function loadNews() {
  return (dispatch, getState) => {

    const state = getState()
    console.log('loadnws action state', state)
    //TODO do check here for loading state and I guess just ignore it if load in progress?

    dispatch({
      type: t.LOAD_NEWS_START
    })

    //todo cache here
    fetch(URL + 'topstories.json').then(res=>{
      if (res.status >= 400) {
        dispatch(loadNewsError(res))
      } else return res.json()
    })
    .then(json => {
      //making 31 reqs will be slow bc concurrent connection limit...
      //https://www.npmjs.com/package/http-proxy maybe make a small server
      //todo cache here
      return Promise.all(
        json.slice(0, PER_PAGE).map(item => fetch(`${URL}item/${item}.json`))
      )
    })
    .catch(err => dispatch(loadNewsError(res)))
    //todo check all item responses for 404? or will above catch work?
    .then(items => Promise.all(items.map(item =>item.json())))
    .then(json => dispatch(loadNewsSuccess(json)))
  }
}
