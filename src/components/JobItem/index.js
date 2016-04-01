import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'

import styles from '../NewsItem/NewsItem.scss'
import c from '../../constants'

const JobItem = React.createClass({
  render() {
    const {item, index} = this.props

    const by = <Link to={`${c.ROOT_PATH}/user/${item.by}`}>{item.by}</Link>

    const host = window.URL && item.url ? new window.URL(item.url) : {}

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
            <div>by {by} |</div>
            <div>{time}</div>
          </div>
        </div>
      </li>
    )
  }
})

JobItem.propTypes = {
  item: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired
}


export default JobItem
