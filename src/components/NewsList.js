import React from 'react'

import c from '../constants.js'
import styles from '../styles/news.scss'
import NewsItem from './NewsItem'
import JobItem from './JobItem'

//TODO this needs proptypes thing (does it really tho? lol)
const NewsList = React.createClass({
  componentDidMount () {
    this.props.onLoad()
    //TODO https://github.com/oliviertassinari/react-event-listener
    //try this instead? server rendering wouldnt have access to a window var...
    //http://stackoverflow.com/questions/32896624/react-js-best-practice-regarding-listening-to-window-events-from-components
    window.addEventListener('scroll', this.onScroll)
  },
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  },
  onScroll(e) {
    const body = e.target.body
    if (body.scrollTop > 0 && body.scrollTop >= body.offsetHeight - window.innerHeight - 200) {
      this.fetchMore()
    }
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
        <ul className='news-items'>{list}</ul>
        <div className='loading'>{spinner}</div>
      </div>
    )
  }
})

export default NewsList
