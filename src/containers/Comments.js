import React from 'react'
import { connect } from 'react-redux'

import c from '../constants'
import { loadComments } from '../actions'
import RecursiveComments from '../components/Comments'


export const Comments = React.createClass({
  componentDidMount() {
    this.props.loadComments(this.props.params.id);
  },
  componentWillReceiveProps(nextProps, oldProps){
    if (nextProps.params.id != this.props.params.id) {
      this.props.loadComments(nextProps.params.id)
    }
  },
  render() {
    const {loading} = this.props.comments
    return (
      <div>
        {loading && <div>LOADING</div>}
        {!loading && <RecursiveComments comments={this.props.comments} />}
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    comments: state.comments
  }
}


export default connect(mapStateToProps,
  {
    loadComments
  }
)(Comments)
