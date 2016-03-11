import React from 'react'
import { connect } from 'react-redux'

import c from '../constants'
import { loadShowStories } from '../actions'
import NewsList from '../components/NewsList.js'

//TODO this needs proptypes thing (does it really tho? lol)
const Show = React.createClass({
  render() {
    return (
      <NewsList
        onLoad={this.props.loadShowStories}
        list={this.props.showStories}  
        newsType={c.SHOW_STORIES}
      />
    )
  }
})

function mapStateToProps(state) {
  return {
    showStories: state[c.SHOW_STORIES]
  }
}


export default connect(mapStateToProps,
  {
    loadShowStories
  }
)(Show)
