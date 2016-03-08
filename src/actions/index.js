import c from '../constants'
import fetch from 'isomorphic-fetch'


function loadNewsStart(initialLoad) {
  return {
    type: c.LOAD_NEWS_START,
    payload: {
      initialLoad
    }
  }
}

function loadNewsSuccess(data) {
  return {
    type: c.LOAD_NEWS_SUCCESS,
    payload: {
      data
    }
  }
}

function loadNewsError(err) {
  return {
    type: c.LOAD_NEWS_ERROR,
    payload: err
  }
}

function loadNewsIncrementDisplaying(count) {
  return {
    type: c.LOAD_NEWS_INCREMENT_DISPLAYING,
    payload: count
  }
}

export function loadNews(initialLoad=true) {
  return (dispatch, getState) => {

    let state = getState()
    if (state.newsItems.loading) {
      console.log('already in loading state')
      return
    }

    dispatch(loadNewsStart(initialLoad))
    //by dispatching action we alter state, so call again
    state = getState()
    const itemCount = state.newsItems.items.length
    //if number of items in current store is >= what we need can just
    //increment the number of posts to display
    //else we fetch the new posts
    if (state.newsItems.currentlyDisplaying + c.PER_PAGE <= itemCount) {
      dispatch(loadNewsIncrementDisplaying(c.PER_PAGE))
    } else {
      //todo cache here
      fetch(c.URL + 'topstories.json').then(res=>{
        if (res.status >= 400) {
          dispatch(loadNewsError(res))
        } else return res.json()
      })
      .then(json => {
        //making 31 reqs will be slow bc concurrent connection limit...
        //https://www.npmjs.com/package/http-proxy maybe make a small server
        const start = state.newsItems.currentlyDisplaying
        return Promise.all(
          json.slice(start, start + c.PER_PAGE).map(item => fetch(`${c.URL}item/${item}.json`))
        )
      })
      .catch(err => dispatch(loadNewsError(res)))
      //todo check all item responses for 404? or will above catch work?
      .then(items => Promise.all(items.map(item =>item.json())))
      .then(json => dispatch(loadNewsSuccess(json)))
    }
  }
}
