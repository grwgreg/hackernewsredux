import React from 'react'
import { connect } from 'react-redux'

import c from '../constants'
import { loadJobStories } from '../actions'
import NewsList from '../components/NewsList.js'

//TODO this needs proptypes thing (does it really tho? lol)
const Jobs = React.createClass({
  render() {
    return (
      <NewsList
        onLoad={this.props.loadJobStories}
        list={this.props.jobStories}  
        newsType={c.JOB_STORIES}
      />
    )
  }
})

function mapStateToProps(state) {
  return {
    jobStories: state[c.JOB_STORIES]
  }
}


export default connect(mapStateToProps,
  {
    loadJobStories
  }
)(Jobs)
