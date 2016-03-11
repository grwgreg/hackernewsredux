import React from 'react'

//TODO this needs proptypes thing (does it really tho? lol)
const NewsItem = React.createClass({
  render() {
    const {item, index} = this.props

    const comments = item.descendants + ' Comments'

    return (
      <li>
        <div>Post {index+1}</div>
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
  }
})


export default NewsItem
