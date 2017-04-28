import React from 'react'

export default class Radical extends React.Component {
  render() {
    const { radical } = this.props
    return (
      <div>
        {radical.strokes} {radical.char}
      </div>
    )
  }
}
