import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { expect } from 'chai';

import { loadUser } from '../../src/actions/users'
import c from '../../src/constants'

//http://chaijs.com/api/bdd/
//http://redux.js.org/docs/recipes/WritingTests.html

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Comments Actions' , () => {

  afterEach(() => {
    nock.cleanAll()
  })

  it('should fetch user if not already set in state', function(done) {

    const scope = nock('https://hacker-news.firebaseio.com')

      .get('/v0/user/some_user.json')
      .reply(200, { id: 'some_user', karma: 2})


    const expectedActions = [
    { type: c.LOAD_USERS_START, payload: {} },
    { type: c.LOAD_USERS_SUCCESS,
      payload: { user: {id: 'some_user', karma: 2} } } ]


    const store = mockStore({
      users: {
        loading: false,
        currentID: 'another_user',
        items: {
          another_user: {}
        }
      }
    })

   store.dispatch(loadUser('some_user'))
    .then(() => {
      const actions = store.getActions()
      expect(actions).to.deep.equal(expectedActions)
      expect(scope.isDone()).to.be.true
      done()
    })

  });

  it('should not make ajax requests if user data is already in state', function() {

    nock('https://hacker-news.firebaseio.com')

    const expectedActions = [
      { type: c.SET_USERS_CURRENT_ID, payload: { id: 98 } }
    ]

    const store = mockStore({
      users: {
        loading: false,
        currentID: 66,
        items: {
          98: {id:98}
        }
      }
    })

    store.dispatch(loadUser(98))
    const actions = store.getActions()
    expect(actions).to.deep.equal(expectedActions)

  });

});
