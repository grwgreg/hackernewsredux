import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'

import styles from './NewsItem.scss'

const NewsItem = React.createClass({
  render() {
    const {item, index} = this.props

    const comments = <Link to={`/comments/${item.id}`}>{item.descendants + ' Comments'}</Link>

    const by = <Link to={`/user/${item.by}`}>{item.by}</Link>

    const host = window.URL ? new window.URL(item.url) : {}

    const time = moment.unix(+item.time).fromNow()

    return (
      <li className={styles.item}>
        <div>{index+1}.</div>
        <div>
          <h2>
            <a href={item.url} target="_blank">{item.title}</a>
            <span><a href={host.origin}>{'(' + host.host + ')'}</a></span>
          </h2>
          <div className={styles.meta}>
            <div>{item.score} points by {by} |</div>
            <div>{time} |</div>
            <div>{comments}</div>
          </div>
        </div>
      </li>
    )
  }
})

NewsItem.propTypes = {
  item: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired
}


export default NewsItem
