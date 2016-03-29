import React from 'react'

import styles from './Notify.scss'

export default React.createClass({
  render() {
    const {notify, hideNotify, notifyMsg, notifyVisible} = this.props
//    const visible = notifyVisible ? 'visible' : 'hidden'

    return (
      <div className={styles.notify} data-visible={notifyVisible}>
        <div className={styles.close} onClick={hideNotify}>X</div>
        <div className={styles.msg}>{notifyMsg}</div>
      </div>
    )
  }
})

