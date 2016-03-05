import React from 'react';
import { connect } from 'react-redux'

function loadNews(dispatch) {
  console.log('loading news');
  dispatch({
    type: 'LOAD_NEWS'
  })
}

function thunkTest(dispatch) {
  console.log('thunkTest fn');
  dispatch((realDispatch,getState) => {
    realDispatch({type: 'THUNK_TEST_START'})
    setTimeout(() => realDispatch({ type: 'THUNK_TEST_LOADED' }), 5000)
  })
}

const News = React.createClass({
  render() {
    const {dispatch} = this.props
    return (
      <div>
        <h3>News</h3>
        <button onClick={loadNews.bind(null,dispatch)}>Load News</button>
        <button onClick={thunkTest.bind(null,dispatch)}>thunktest</button>
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    it: state
  }
}


export default connect(mapStateToProps)(News);
