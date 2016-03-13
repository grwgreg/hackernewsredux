import React from 'react'
import { connect } from 'react-redux'

import c from '../constants'
import { loadComments } from '../actions'

function renderComments(comments) {
  const comment = comments.comment
  const children = comments.childComments.map(renderComments) 
  return (
    <li key={comment.id}>
      <div>{comment.by}</div>
      <div>{comment.time}</div>
      <div>{comment.text}</div>
      {children.length && <ul>{children}</ul>}
    </li>
  )
}

//TODO this needs proptypes thing (does it really tho? lol)
const Comments = React.createClass({
  componentDidMount() {
    this.props.loadComments(this.props.params.id);
  },
  componentWillReceiveProps(nextProps, oldProps){
    if (nextProps.params.id != this.props.params.id) {
      this.props.loadComments(nextProps.params.id)
    }
  },
  render() {
    const {items, currentId, loading} = this.props.comments
    const comments = items[currentId]
    return (
      <div>
        {loading && <div>LOADING</div>}
        <ul>
          {comments && comments.childComments.map(renderComments)}
        </ul>
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
