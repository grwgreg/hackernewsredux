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

  it('should make no ajax requests and dispatch action to increment display count if items are already in store', function() {

    //this.timeout(3000);

    //if any ajax reqs are made nock will throw error
    const scope = nock('https://hacker-news.firebaseio.com')

    const expectedActions = [
      { type: c.LOAD_NEWS_START,
        payload: { initialLoad: true, newsType: c.TOP_STORIES } },
      { type: c.LOAD_NEWS_INCREMENT_DISPLAYING,
        payload: { count: 4, newsType: c.TOP_STORIES } }
    ]


    const store = mockStore({
      //we'll be in this state if only 4 loadable items and we previously loaded this route
      [c.TOP_STORIES]: {
        loading: false,
        currentlyDisplaying: 0,
        loadableItems: [3,4,5,6],
        items: [{id:3},{id:4},{id:5},{id:6}]
      }
    })

    store.dispatch(loadTopStories())
    const actions = store.getActions()
    expect(actions).to.deep.equal(expectedActions)

  });

  it('should should not make ajax request for top stories if loadableItems is already set in state', function(done) {

    //we still make ajax req for individual items, but not the topstories.json
    nock('https://hacker-news.firebaseio.com')

      .get('/v0/item/44.json')
      .reply(200, { id: 44 })

      .get('/v0/item/55.json')
      .reply(200, { id: 55 })

    const expectedActions = [
      { type: c.LOAD_NEWS_START,
        payload: { initialLoad: true, newsType: c.TOP_STORIES } },
      { type: c.LOAD_NEWS_SUCCESS,
        payload: { data: [ {id:44}, {id:55} ], newsType: c.TOP_STORIES } }
    ]

    const store = mockStore({
      [c.TOP_STORIES]: {
        loading: false,
        currentlyDisplaying: 0,
        loadableItems: [44,55],
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

  it('should only make requests for new items when paginating', function(done) {

    nock('https://hacker-news.firebaseio.com')

      .get('/v0/item/44.json')
      .reply(200, { id: 44 })

      .get('/v0/item/55.json')
      .reply(200, { id: 55 })

    const expectedActions = [
      { type: c.LOAD_NEWS_START,
        payload: { initialLoad: false, newsType: c.TOP_STORIES } },
      { type: c.LOAD_NEWS_SUCCESS,
        payload: { data: [ {id:44}, {id:55} ], newsType: c.TOP_STORIES } }
    ]

    const store = mockStore({
      [c.TOP_STORIES]: {
        loading: false,
        currentlyDisplaying: 10,
        loadableItems: [1,2,3,4,5,6,7,8,9,10,44,55],
        items: new Array(10)//only .length property used to check item count
      }
    })

   //when paginating we pass false so the currentlyDisplaying attr isn't reset to 0
   //in these tests it doesnt matter because dispatching actions doesn't alter our mock state anyway
   store.dispatch(loadTopStories(false))
    .then(() => {
      const actions = store.getActions()
      expect(actions).to.deep.equal(expectedActions)
      done()
    })

  });

  it('should make no ajax requests and only increment display count when paginating if already loaded in state', function() {

    nock('https://hacker-news.firebaseio.com')

    const expectedActions = [
      { type: c.LOAD_NEWS_START,
        payload: { initialLoad: false, newsType: c.TOP_STORIES } },
      { type: c.LOAD_NEWS_INCREMENT_DISPLAYING,
        payload: { count: 2, newsType: c.TOP_STORIES } }
    ]

    const store = mockStore({
      [c.TOP_STORIES]: {
        loading: false,
        currentlyDisplaying: 10,
        loadableItems: [1,2,3,4,5,6,7,8,9,10,44,55],
        items: new Array(12)//only .length property used to check item count
      }
    })

    store.dispatch(loadTopStories(false))
    const actions = store.getActions()
    expect(actions).to.deep.equal(expectedActions)

  });
});
