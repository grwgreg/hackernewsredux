import t from './actiontypes'
import fetch from 'isomorphic-fetch'

const URL = 'https://hacker-news.firebaseio.com/v0/'
const PER_PAGE = 30

export function loadNews() {
  return dispatch => {
    dispatch({
      type: t.LOAD_NEWS_START
    })

    fetch(URL + 'topstories.json').then(res=>{
      if (res.status >= 400) {
        dispatch({
          type: t.LOAD_NEWS_ERROR,
          payload: res
        })
      } else return res.json()
    })
    .then(json => {
      //making 31 reqs will be slow bc concurrent connection limit...
      //https://www.npmjs.com/package/http-proxy maybe make a small server
      return Promise.all(
        json.slice(0, PER_PAGE).map(item => fetch(`${URL}item/${item}.json`))
      )
    })
    .catch(err=>{
      dispatch({
        type: t.LOAD_NEWS_ERROR,
        payload: res
      })
    })
    //todo check all item responses for 404? or will above catch work?
    .then(items => Promise.all(items.map(item =>item.json())))
    .then(json => {
console.log('json',json);
      dispatch({
        type: t.LOAD_NEWS_SUCCESS,
        payload: json 
      })
    })
  }
}
