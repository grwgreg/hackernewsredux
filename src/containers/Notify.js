import React from 'react'
import { connect } from 'react-redux'

import c from '../constants'
import { notify, hideNotify } from '../actions'

//TODO this needs proptypes thing (does it really tho? lol)
const Notify = React.createClass({
  render() {
    const {notify, hideNotify, msg, visible} = this.props
    const visibleClass = 'notify notify-' + visible ? 'visible' : 'hidden'

    return (
      <div className={visibleClass}>
        <div onClick={hideNotify}>X</div>
        {msg}
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    visible: state.notify.visible,
    msg: state.notify.msg
  }
}


export default connect(mapStateToProps,
  {
    notify,
    hideNotify
  }
)(Notify)
