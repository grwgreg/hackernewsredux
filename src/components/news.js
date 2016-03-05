import React from 'react'
import { connect } from 'react-redux'

import { loadNews } from '../actions'

const News = React.createClass({
  render() {
    const {loadNews} = this.props
    return (
      <div>
        <h3>News</h3>
        <button onClick={loadNews}>Load News</button>
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    it: state
  }
}


export default connect(mapStateToProps,
  {
    loadNews
  }
)(News)
