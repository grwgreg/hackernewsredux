import { expect } from 'chai';

import reducers from '../../src/reducers/news'
import c from '../../src/constants'

//http://chaijs.com/api/bdd/
//http://redux.js.org/docs/recipes/WritingTests.html

const newsTypes = [
    c.TOP_STORIES,
    c.SHOW_STORIES,
    c.ASK_STORIES,
    c.JOB_STORIES,
    c.NEW_STORIES
  ]

describe('News reducers', ()=> {
  it('should return initial state', ()=> {

    const initialState = {
      loading: false,
      currentlyDisplaying: 0,
      loadableItems: [],
      items: []
    }

    newsTypes.forEach(type => {
      expect(reducers[type](undefined, {}))
        .to.deep.equal(initialState)
    })

  })
  it('should handle LOAD_NEWS_START', ()=> {

    const state = {
      loading: false,
      currentlyDisplaying: 3,
      loadableItems: [1,2,3,4,5,6],
      items: [{id:1},{id:2},{id:3}]
    }
    const newState = {
      loading: true,
      currentlyDisplaying: 3,
      loadableItems: [1,2,3,4,5,6],
      items: [{id:1},{id:2},{id:3}]
    }
    const newStateInitialLoad = {
      loading: true,
      currentlyDisplaying: 0,
      loadableItems: [1,2,3,4,5,6],
      items: [{id:1},{id:2},{id:3}]
    }

    newsTypes.forEach(type => {
      expect(reducers[type](state, {
        type: c.LOAD_NEWS_START,
        payload: {
          initialLoad: false,
          newsType: type
        }
      }))
        .to.deep.equal(newState)

      expect(reducers[type](state, {
        type: c.LOAD_NEWS_START,
        payload: {
          initialLoad: true,
          newsType: type
        }
      }))
        .to.deep.equal(newStateInitialLoad)
    })

  })

  it('should handle LOAD_NEWS_SUCCESS', ()=> {

    const state = {
      loading: true,
      currentlyDisplaying: 3,
      loadableItems: [1,2,3,4,5,6],
      items: [{id:1},{id:2},{id:3}]
    }
    const newState = {
      loading: false,
      currentlyDisplaying: 6,
      loadableItems: [1,2,3,4,5,6],
      items: [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6}]
    }

    newsTypes.forEach(type => {
      expect(reducers[type](state, {
        type: c.LOAD_NEWS_SUCCESS,
        payload: {
          data: [{id:4},{id:5},{id:6}],
          newsType: type
        }
      }))
        .to.deep.equal(newState)

    })

  })

  it('should handle LOAD_NEWS_INCREMENT_DISPLAYING', ()=> {

    const state = {
      loading: true,
      currentlyDisplaying: 0,
      loadableItems: [1,2,3,4,5,6],
      items: [{id:1},{id:2},{id:3}]
    }
    const newState = {
      loading: false,
      currentlyDisplaying: 3,
      loadableItems: [1,2,3,4,5,6],
      items: [{id:1},{id:2},{id:3}]
    }

    newsTypes.forEach(type => {
      expect(reducers[type](state, {
        type: c.LOAD_NEWS_INCREMENT_DISPLAYING,
        payload: {
          count: 3,
          newsType: type
        }
      }))
        .to.deep.equal(newState)

    })

  })

  it('should handle LOAD_NEWS_INCREMENT_DISPLAYING', ()=> {

    const state = {
      loading: true,
      currentlyDisplaying: 0,
      loadableItems: [],
      items: []
    }
    const newState = {
      loading: true,
      currentlyDisplaying: 0,
      loadableItems: [1,2,3,4,5,6],
      items: []
    }

    newsTypes.forEach(type => {
      expect(reducers[type](state, {
        type: c.SET_NEWS_LOADABLE_ITEMS,
        payload: {
          items: [1,2,3,4,5,6],
          newsType: type
        }
      }))
        .to.deep.equal(newState)

    })

  })

  it('should handle LOAD_NEWS_ERROR', ()=> {

    const state = {
      loading: true,
      currentlyDisplaying: 0,
      loadableItems: [],
      items: []
    }
    const newState = {
      currentlyDisplaying: 0,
      loadableItems: [],
      items: [],
      loading: false
    }

    newsTypes.forEach(type => {
      expect(reducers[type](state, {
        type: c.LOAD_NEWS_ERROR,
        payload: {
          err: 'doesnt matter',
          newsType: type
        }
      }))
        .to.deep.equal(newState)

    })

  })
})
