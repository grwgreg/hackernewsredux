import React from 'react'
import { Link } from 'react-router'

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/news">news</Link></li>
          <li><Link to="/show">show</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

export default App;
