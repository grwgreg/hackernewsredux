import React from 'react'

import styles from './Notify.scss'

const Notify = React.createClass({
  render() {
    const {notify, hideNotify, notifyMsg, notifyVisible} = this.props

    return (
      <div className={styles.notify} data-visible={notifyVisible}>
        <div className={styles.close} onClick={hideNotify}>X</div>
        <div className={styles.msg}>{notifyMsg}</div>
      </div>
    )
  }
})

Notify.propTypes = {
  notify: React.PropTypes.func.isRequired,
  hideNotify: React.PropTypes.func.isRequired,
  notifyMsg: React.PropTypes.string.isRequired,
  notifyVisible: React.PropTypes.bool.isRequired
}

export default Notify
