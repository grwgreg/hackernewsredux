import React from 'react'

//TODO this needs proptypes thing (does it really tho? lol)
const JobItem = React.createClass({
  render() {
    const {item, index} = this.props

    return (
      <li>
        <div>Job {index+1}</div>
        <h2>
          <a href={item.url} target="_blank">{item.title}</a>
          <span><a href='#'>(TODO the sites base url)</a></span>
        </h2>
        <div>by {item.by}</div>
        <div>{item.time} time ago TODO</div>
      </li>
    )
  }
})


export default JobItem
