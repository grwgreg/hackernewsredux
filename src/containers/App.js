import React from 'react'
import { Link } from 'react-router'

import styles from '../styles/styles.scss'
import Notify from './Notify'

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul className={styles.green}>
          <li><Link to="/news">news</Link></li>
          <li><Link to="/newest">new</Link></li>
          <li><Link to="/show">show</Link></li>
          <li><Link to="/ask">ask</Link></li>
          <li><Link to="/jobs">jobs</Link></li>
        </ul>
        <Notify />
        {this.props.children}
      </div>
    )
  }
})

export default App
