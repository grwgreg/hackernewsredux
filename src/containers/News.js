import React from 'react'
import { connect } from 'react-redux'

import c from '../constants'
import { loadTopStories } from '../actions'
import NewsList from '../components/NewsList.js'

//TODO this needs proptypes thing (does it really tho? lol)
const News = React.createClass({
  render() {
    return (
      <NewsList
        onLoad={this.props.loadTopStories}
        list={this.props.topStories}  
      />
    )
  }
})

function mapStateToProps(state) {
  return {
    topStories: state[c.TOP_STORIES]
  }
}


export default connect(mapStateToProps,
  {
    loadTopStories
  }
)(News)
