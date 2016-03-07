import React from 'react'
import { connect } from 'react-redux'

import { loadNews } from '../actions'

//TODO this needs proptypes thing (does it really tho? lol)
const News = React.createClass({
  componentDidMount () {
    //TODO when I navigate to another route and back have to prevent unneeded ajax call+.items push of same data...
    //maybe make an initialLoadNews or keep state of pagination and check that in action
    //keep infinite scrolling or pagination in mind
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
      <div>
        <h3>News</h3>
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
