import { expect } from 'chai';

import {users as reducer} from '../../src/reducers/users'
import c from '../../src/constants'

//http://chaijs.com/api/bdd/
//http://redux.js.org/docs/recipes/WritingTests.html


describe('Users reducer', ()=> {
  it('should return initial state', ()=> {

    const initialState = {
      loading: false,
      items: {},
      currentId: undefined
    }

    expect(reducer(undefined, {}))
      .to.deep.equal(initialState)

  })

  it('should handle LOAD_USERS_START', ()=> {

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

    expect(reducer(state, { type: c.LOAD_USERS_START }))
      .to.deep.equal(newState)

  })

  it('should handle SET_USERS_CURRENT_ID', ()=> {

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
      type: c.SET_USERS_CURRENT_ID,
      payload: {
        id: 44
      }
     }))
      .to.deep.equal(newState)

  })

  it('should handle LOAD_USERS_SUCCESS', ()=> {

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
      type: c.LOAD_USERS_SUCCESS,
      payload: {
        user: {id:55}
      }
     }))
      .to.deep.equal(newState)

  })
})
