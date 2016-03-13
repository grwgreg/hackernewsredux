import React from 'react'

import c from '../constants.js'
import styles from '../styles/news.scss'
import NewsItem from './NewsItem'
import JobItem from './JobItem'

//TODO this needs proptypes thing (does it really tho? lol)
const NewsList = React.createClass({
  componentDidMount () {
    this.props.onLoad()
  },
  fetchMore() {
    if (this.props.list.currentlyDisplaying < this.props.list.loadableItems.length){
      this.props.onLoad(false)
    }
  },
  render() {
    const {onLoad, newsType} = this.props
    const {loading, items, currentlyDisplaying} = this.props.list

    const spinner = loading ? 'LOADING' : ''

    const list = items.slice(0,currentlyDisplaying).map((item,i) => {
      return newsType === c.JOB_STORIES
        ? <JobItem item={item} index={i} key={item.id} />
        : <NewsItem item={item} index={i} key={item.id} />
    })

    return (
      <div className={styles.why}>
        <h3 className={styles.hello}>News</h3>
        <button onClick={this.fetchMore}>Load News</button>
        <div className='loading'>{spinner}</div>
        <ul className='news-items'>{list}</ul>
      </div>
    )
  }
})


export default NewsList
