import React from 'react'
import { connect } from 'react-redux'

import { loadNews } from '../actions'
import styles from '../styles/news.scss'

//TODO this needs proptypes thing (does it really tho? lol)
const News = React.createClass({
  componentDidMount () {
    this.props.loadNews()
  },
  render() {
    const {loadNews} = this.props
    const {loading, items, currentlyDisplaying} = this.props.newsItems

    const spinner = loading ? 'LOADING' : ''

    const list = items.slice(0,currentlyDisplaying).map((item,i) => {
      //TODO make comments a link to comments route
      const comments = item.descendants + ' Comments'

      return (
        <li key={item.id}>
          <div>Post {i+1}</div>
          <h2>
            <a href={item.url} target="_blank">{item.title}</a>
            <span><a href='#'>(TODO the sites base url)</a></span>
          </h2>
          <div>{item.score} points</div>
          <div>by {item.by}</div>
          <div>{item.time} time ago TODO</div>
          <div>{comments}</div>
        </li>
      )
    })

    return (
      <div className={styles.why}>
        <h3 className={styles.hello}>News</h3>
        <button onClick={loadNews.bind(null,false)}>Load News</button>
        <div className='loading'>{spinner}</div>
        <ul className='news-items'>{list}</ul>
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    newsItems: state.newsItems
  }
}


export default connect(mapStateToProps,
  {
    loadNews
  }
)(News)
