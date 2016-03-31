import React from 'react'
import moment from 'moment'

import styles from './User.scss'

const User = React.createClass({
  render() {
    const {id, created, karma, about} = this.props.user

  const age = moment.unix(+created).fromNow()

    return (
      <div className={styles.user}>
        <div>
          <label>user:</label> {id}
        </div>
        <div>
          <label>created:</label> {age}
        </div>
        <div>
          <label>karma:</label> {karma}
        </div>
        <div>
          <label>about:</label> {about}
        </div>
      </div>
    )
  }
})

User.propTypes = {
  user: React.PropTypes.object.isRequired,
}


export default User
