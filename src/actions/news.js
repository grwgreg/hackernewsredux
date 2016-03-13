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

function setNewsLoadableItems(items, newsType) {
  return {
    type: c.SET_NEWS_LOADABLE_ITEMS,
    payload: {
      items,
      newsType
    }
  }
}

function loadNews(newsType, initialLoad) {
  return (dispatch, getState) => {

    let state = getState()
    if (state[newsType].loading) {
      console.log('already in loading state')
      return
    }

    //TODO can move this to above fetch i think
    //TODO actually no? we need to reset currently displaying for initial load
    dispatch(loadNewsStart(initialLoad, newsType))
    //by dispatching action we alter state, so call again
    state = getState()
    const itemCount = state[newsType].items.length
    const loadableItems = state[newsType].loadableItems
    const totalItems = loadableItems.length
    const currentlyDisplaying = state[newsType].currentlyDisplaying
    const remaining = totalItems - currentlyDisplaying
    const incrementBy = Math.min(c.PER_PAGE, remaining)

    //we check if the items being requested are already in the state
    //if they are we dispatch loadNewsIncrementDisplaying to increment the number of items displayed
    //otherwise we fetch the data
    if (totalItems && currentlyDisplaying === totalItems) {
      //on initial load both totalItems and currentlyDisplaying are 0, so skip
      throw new Error('There are no more items to display. This action should not have been called.')
    } else if (incrementBy && currentlyDisplaying + incrementBy <= itemCount) {
      //on initial load incrementBy has a value of 0 and we have no data to display, so skip
      dispatch(loadNewsIncrementDisplaying(incrementBy, newsType))
    } else {

      const itemsPromise = loadableItems.length
        ? Promise.resolve(loadableItems)
        : fetch(endPoints[newsType])
          .then(res=> res.json())
          .then(items => {
            dispatch(setNewsLoadableItems(items, newsType))
            return items
          })
      itemsPromise.then(items => {
        //making 31 reqs will be slow bc concurrent connection limit...
        //https://www.npmjs.com/package/http-proxy maybe make a small server
        const start = state[newsType].currentlyDisplaying
//TODO potential bug here if totalItems is less than c.PER_PAGE
//should take min of totalItems and per page maybe?
        return Promise.all(
          items
            .slice(start, start + c.PER_PAGE)
            .map(item => fetch(`${c.URL}item/${item}.json`))
        )
      })
      //todo check all item responses for 404? or will above catch work?
      .then(items => Promise.all(items.map(item =>item.json())))
      .then(json => dispatch(loadNewsSuccess(json, newsType)))
      .catch(err => dispatch(loadNewsError(res)))
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
