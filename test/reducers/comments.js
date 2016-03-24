import { expect } from 'chai';

import {comments as reducer} from '../../src/reducers/comments'
import c from '../../src/constants'

//http://chaijs.com/api/bdd/
//http://redux.js.org/docs/recipes/WritingTests.html


describe('Comments reducers', ()=> {
  it('should return initial state', ()=> {

    const initialState = {
      loading: false,
      items: {},
      currentId: undefined
    }

    expect(reducer(undefined, {}))
      .to.deep.equal(initialState)

  })

  it('should handle LOAD_COMMENTS_START', ()=> {

    const state = {
      loading: false,
      items: {},
      currentId: undefined
    }
    const newState = {
      loading: true,
      items: {},
      currentId: undefined
    }

    expect(reducer(state, { type: c.LOAD_COMMENTS_START }))
      .to.deep.equal(newState)

  })

  it('should handle SET_COMMENTS_CURRENT_ID', ()=> {

    const state = {
      loading: true,
      items: {},
      currentId: undefined
    }
    const newState = {
      loading: false,
      items: {},
      currentId: 44
    }

    expect(reducer(state, {
      type: c.SET_COMMENTS_CURRENT_ID,
      payload: {
        id: 44
      }
     }))
      .to.deep.equal(newState)

  })

  it('should handle LOAD_COMMENTS_SUCCESS', ()=> {

    const state = {
      loading: true,
      items: {44: {id:44}},
      currentId: 44
    }
    const newState = {
      loading: false,
      items: {
        44: {id:44},
        55: {id:55}
      },
      currentId: 55
    }

    expect(reducer(state, {
      type: c.LOAD_COMMENTS_SUCCESS,
      payload: {
        comments: {id:55}
      }
     }))
      .to.deep.equal(newState)

  })

  it('should handle LOAD_COMMENTS_ERROR', ()=> {

    const state = {
      loading: true,
      items: {44: {id:44}},
      currentId: 44
    }
    const newState = {
      loading: false,
      items: {44: {id:44}},
      currentId: 44
    }

    expect(reducer(state, {
      type: c.LOAD_COMMENTS_ERROR,
      payload: {
        err: {}
      }
     }))
      .to.deep.equal(newState)

  })
})
