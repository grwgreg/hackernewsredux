import React from 'react'
import { connect } from 'react-redux'

import c from '../constants'
import { loadUser } from '../actions'

//TODO this needs proptypes thing (does it really tho? lol)
const User = React.createClass({
  componentDidMount () {
    this.props.loadUser(this.props.params.id)
  },
  render() {
  const user = this.props.user || {}
    return (
<div>
  <div>
    user: {user.id}
  </div>
  <div>
    created: {user.created}
  </div>
  <div>
    karma: {user.karma}
  </div>
  <div>
    about: {user.about}
  </div>
</div>
    )
  }
})

function mapStateToProps(state) {
  return {
    user: state.users.items[state.users.currentId]
  }
}

export default connect(mapStateToProps,
  {
    loadUser
  }
)(User)
