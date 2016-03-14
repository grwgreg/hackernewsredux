import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { expect } from 'chai';

import { loadTopStories } from '../../src/actions/news'
import c from '../../src/constants'

//http://chaijs.com/api/bdd/
//http://redux.js.org/docs/recipes/WritingTests.html


const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('News Actions' , () => {

  beforeEach(() => {
//
  });

  afterEach(() => {
    nock.cleanAll()
  })

  it('should make multiple ajax requests and dispatch actions on initial load', function(done) {

    //this.timeout(3000);

    nock('https://hacker-news.firebaseio.com')
      .get('/v0/topstories.json')
      .reply(200, [44,55] )

      .get('/v0/item/44.json')
      .reply(200, { id: 44 })

      .get('/v0/item/55.json')
      .reply(200, { id: 55 })

    const expectedActions = [
      { type: c.LOAD_NEWS_START,
        payload: { initialLoad: true, newsType: c.TOP_STORIES } },
      { type: c.SET_NEWS_LOADABLE_ITEMS,
        payload: { items: [ 44, 55 ], newsType: c.TOP_STORIES } },
      { type: c.LOAD_NEWS_SUCCESS,
        payload: { data: [ {id:44}, {id:55} ], newsType: c.TOP_STORIES } }
    ]

    const store = mockStore({
      //initial store state
      [c.TOP_STORIES]: {
        loading: false,
        currentlyDisplaying: 0,
        loadableItems: [],
        items: []
      }
    })

   store.dispatch(loadTopStories())
    .then(() => {
      const actions = store.getActions()
      expect(actions).to.deep.equal(expectedActions)
      done()
    })

  });
});
