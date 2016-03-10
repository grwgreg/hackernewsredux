import React from 'react'
import { connect } from 'react-redux'

import c from '../constants'
import { loadNewStories } from '../actions'
import NewsList from '../components/NewsList.js'

//TODO this needs proptypes thing (does it really tho? lol)
const Newest = React.createClass({
  render() {
    return (
      <NewsList
        onLoad={this.props.loadNewStories}
        list={this.props.newStories}  
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
