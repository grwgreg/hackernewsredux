import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'

import c from '../../constants'
import styles from './Comments.scss'

function renderComments(zebra, comments) {
  const comment = comments.comment
  const children = comments.childComments.map(renderComments.bind(null, !zebra))
  const by = <Link to={`/user/${comment.by}`}>{comment.by}</Link>
  const time = moment.unix(+comment.time).fromNow()
  return (
    <li key={comment.id} data-id={comment.id} data-zebra={zebra}>
      <div className={styles.meta}>{by}<span className={styles.time}>{time}</span></div>
      <div dangerouslySetInnerHTML={{__html: comment.text}}></div>
      {children.length && <ul>{children}</ul>}
    </li>
  )
}

export default React.createClass({
  render() {
    const {items, currentId} = this.props.comments
    const comments = items[currentId]
    return (
      <div>
        <ul className={styles.comments}>
          {comments && comments.childComments.map(renderComments.bind(null, true))}
        </ul>
      </div>
    )
  }
})
