import React from 'react'
import { connect } from 'react-redux'

import c from '../constants'
import { loadNewStories } from '../actions'
import NewsList from '../components/NewsList'

const Newest = React.createClass({
  render() {
    return (
      <NewsList
        onLoad={this.props.loadNewStories}
        list={this.props.newStories}
        newsType={c.NEW_STORIES}
      />
    )
  }
})

function mapStateToProps(state) {
  return {
    newStories: state[c.NEW_STORIES]
  }
}


export default connect(mapStateToProps,
  {
    loadNewStories
  }
)(Newest)
