import React from 'react'
import { connect } from 'react-redux'

import c from '../constants'
import { loadAskStories } from '../actions'
import NewsList from '../components/NewsList.js'

//TODO this needs proptypes thing (does it really tho? lol)
const Ask = React.createClass({
  render() {
    return (
      <NewsList
        onLoad={this.props.loadAskStories}
        list={this.props.askStories}  
        newsType={c.ASK_STORIES}
      />
    )
  }
})

function mapStateToProps(state) {
  return {
    askStories: state[c.ASK_STORIES]
  }
}


export default connect(mapStateToProps,
  {
    loadAskStories
  }
)(Ask)
