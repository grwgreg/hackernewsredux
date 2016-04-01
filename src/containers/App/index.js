import React from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'

//require this way so css module loader doesnt mangle class names we need to access globally
require('!style-loader!css-loader!sass-loader!../../styles/styles.scss')
import styles from './App.scss'
import Notify from '../../components/Notify'
import { notify, hideNotify } from '../../actions'

const App = React.createClass({
  render() {
    const {notify, hideNotify, notifyMsg, notifyVisible} = this.props
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
              <li><IndexLink to="/" activeClassName={styles.active} >news</IndexLink></li>
              <li><Link to="/newest" activeClassName={styles.active} >newest</Link></li>
              <li><Link to="/show" activeClassName={styles.active} >show</Link></li>
              <li><Link to="/ask" activeClassName={styles.active} >ask</Link></li>
              <li><Link to="/jobs" activeClassName={styles.active} >jobs</Link></li>
            </ul>
          </div>
        </header>
        <div className={'container ' + styles.main}>
          <Notify notify={notify} hideNotify={hideNotify} notifyMsg={notifyMsg} notifyVisible={notifyVisible}/>
          {this.props.children}
        </div>
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    notifyVisible: state.notify.visible,
    notifyMsg: state.notify.msg
  }
}


export default connect(mapStateToProps,
  {
    notify,
    hideNotify
  }
)(App)
