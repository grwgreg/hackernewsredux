import c from '../constants'
import fetch from 'isomorphic-fetch'

const endPoints = {
  [c.TOP_STORIES]: c.URL + 'topstories.json',
  [c.SHOW_STORIES]: c.URL + 'showstories.json',
  [c.ASK_STORIES]: c.URL + 'askstories.json',
  [c.JOB_STORIES]: c.URL + 'jobstories.json',
  [c.NEW_STORIES]: c.URL + 'newstories.json'
}

function loadNewsStart(initialLoad, newsType) {
  return {
    type: c.LOAD_NEWS_START,
    payload: {
      initialLoad,
      newsType
    }
  }
}

function loadNewsSuccess(data, newsType) {
  return {
    type: c.LOAD_NEWS_SUCCESS,
    payload: {
      data,
      newsType
    }
  }
}

function loadNewsError(err, newsType) {
  return {
    type: c.LOAD_NEWS_ERROR,
    payload: {
      err,
      newsType
    }
  }
}

function loadNewsIncrementDisplaying(count, newsType) {
  return {
    type: c.LOAD_NEWS_INCREMENT_DISPLAYING,
    payload: {
      count,
      newsType
    }
  }
}

function loadNews(newsType,initialLoad) {
  return (dispatch, getState) => {

    let state = getState()
    if (state[newsType].loading) {
      console.log('already in loading state')
      return
    }

    dispatch(loadNewsStart(initialLoad, newsType))
    //by dispatching action we alter state, so call again
    state = getState()
    const itemCount = state[newsType].items.length
    //if number of items in current store is >= what we need can just
    //increment the number of posts to display
    //else we fetch the new posts
    if (state[newsType].currentlyDisplaying + c.PER_PAGE <= itemCount) {
      dispatch(loadNewsIncrementDisplaying(c.PER_PAGE, newsType))
    } else {
      //todo cache here
      fetch(endPoints[newsType]).then(res=>{
        if (res.status >= 400) {
          dispatch(loadNewsError(res, newsType))
        } else return res.json()
      })
      .then(json => {
        //making 31 reqs will be slow bc concurrent connection limit...
        //https://www.npmjs.com/package/http-proxy maybe make a small server
        const start = state[newsType].currentlyDisplaying
//will need logic here to make sure we still have posts to display
//maybe dispatch a new action if so
        return Promise.all(
          json.slice(start, start + c.PER_PAGE).map(item => fetch(`${c.URL}item/${item}.json`))
        )
      })
      .catch(err => dispatch(loadNewsError(res)))
      //todo check all item responses for 404? or will above catch work?
      .then(items => Promise.all(items.map(item =>item.json())))
      .then(json => dispatch(loadNewsSuccess(json, newsType)))
    }
  }
}

export function loadTopStories(initialLoad=true) {
  return loadNews(c.TOP_STORIES, initialLoad)
}

export function loadShowStories(initialLoad=true) {
  return loadNews(c.SHOW_STORIES, initialLoad)
}

export function loadAskStories(initialLoad=true) {
  return loadNews(c.ASK_STORIES, initialLoad)
}

export function loadJobStories(initialLoad=true) {
  return loadNews(c.JOB_STORIES, initialLoad)
}

export function loadNewStories(initialLoad=true) {
  return loadNews(c.NEW_STORIES, initialLoad)
}
