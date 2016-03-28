import React from 'react'
import { Link } from 'react-router'

//require this way so css module loader doesnt mangle class names we need to access globally
require('!style-loader!css-loader!sass-loader!../../styles/styles.scss')
import styles from './App.scss'
import Notify from '../Notify'

const App = React.createClass({
  render() {
    return (
      <div>
        <header className={styles.header}>
          <div className="container clearfix">
            <div className={styles.logo}>
              <Link to="/">
                <i className="fa fa-hacker-news" aria-hidden="true"></i> Hacker News
              </Link>
            </div>
            <ul className={styles.nav}>
              <li><Link to="/news" activeClassName={styles.active} >news</Link></li>
              <li><Link to="/newest" activeClassName={styles.active} >newest</Link></li>
              <li><Link to="/show" activeClassName={styles.active} >show</Link></li>
              <li><Link to="/ask" activeClassName={styles.active} >ask</Link></li>
              <li><Link to="/jobs" activeClassName={styles.active} >jobs</Link></li>
            </ul>
          </div>
        </header>
        <Notify />
        {this.props.children}
      </div>
    )
  }
})

export default App
