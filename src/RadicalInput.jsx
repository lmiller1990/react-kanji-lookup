import React, { Component } from 'react'

export default class RadicalInput extends Component {
  render() {
    const { enterPressed } = this.props
    return(
      <div>
        Search by radical:
        <input onKeyDown={(e) => enterPressed(e, e.target.value.trim() )}/>
      </div>
    )
  }
}
