import React from 'react'
import { connect } from 'react-redux'

import c from '../constants'
import { loadUser } from '../actions'
import UserView from '../components/User'

const User = React.createClass({
  componentDidMount () {
    this.props.loadUser(this.props.params.id)
  },
  render() {
  const user = this.props.user || {}
  const loading = this.props.loading
    return (
      <div>
        {loading && 'LOADING'}
        {!loading && <UserView user={user} />}
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    user: state.users.items[state.users.currentId],
    loading: state.users.loading
  }
}

export default connect(mapStateToProps,
  {
    loadUser
  }
)(User)
