import React from 'react'
import { Link } from 'react-router'

import styles from '../styles/styles.scss'

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul className={styles.green}>
          <li><Link to="/news">news</Link></li>
          <li><Link to="/show">show</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

export default App
