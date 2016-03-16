import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { expect } from 'chai';

import { loadComments } from '../../src/actions/comments'
import c from '../../src/constants'

//http://chaijs.com/api/bdd/
//http://redux.js.org/docs/recipes/WritingTests.html

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Comments Actions' , () => {

  beforeEach(() => {
//
  });

  afterEach(() => {
    nock.cleanAll()
  })

  it('should recursively fetch comments and return a recursive data structure', function(done) {

    //this.timeout(3000);

    const scope = nock('https://hacker-news.firebaseio.com')

      .get('/v0/item/44.json')
      .reply(200, { id: 44, kids: [55, 66, 77] })

      .get('/v0/item/55.json')
      .reply(200, { id: 55 })

      .get('/v0/item/66.json')
      .reply(200, { id: 66, kids: [88] })

      .get('/v0/item/77.json')
      .reply(200, { id: 77 })

      .get('/v0/item/88.json')
      .reply(200, { id: 88 })

    //the .commment ie {id:55} objects here are the full ajax response for a comment, i've ommited the date/text attrs
    //if that comment has children, it will have a kids attribute with array of id's of kids
    //childComments is an array of the full ajax responses for each comment
    const recursiveComments = {
      id: 44,
      comment: { id: 44, kids: [ 55, 66, 77 ] },
      childComments: [
         { id: 55, comment: {id: 55}, childComments: [] },
         { id: 66,
           comment: {id:66, kids:[88]},
           childComments: [
             {id:88,comment:{id:88},childComments:[]}
           ]
         },
         { id: 77, comment: {id:77}, childComments: [] }
      ]
    }

    const expectedActions = [
    { type: c.LOAD_COMMENTS_START, payload: {} },
    { type: c.LOAD_COMMENTS_SUCCESS,
      payload: { comments: recursiveComments } } ]


    const store = mockStore({
      comments: {
        loading: false,
        currentID: 98,
        items: {
          98: {}
        } 
      }
    })

   store.dispatch(loadComments(44))
    .then(() => {
      const actions = store.getActions()
      expect(actions).to.deep.equal(expectedActions)
      expect(scope.isDone()).to.be.true
      done()
    })

  });

  it('should not make ajax requests if comment data is already in state', function() {

    nock('https://hacker-news.firebaseio.com')

    const expectedActions = [
      { type: c.SET_COMMENTS_CURRENT_ID, payload: { id: 98 } }
    ]

    const store = mockStore({
      comments: {
        loading: false,
        currentID: 66,
        items: {
          98: {}
        } 
      }
    })

    store.dispatch(loadComments(98))
    const actions = store.getActions()
    expect(actions).to.deep.equal(expectedActions)

  });
});
