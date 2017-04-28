import React from 'react'

export default class Radical extends React.Component {
  render() {
    const { radicalClicked, radical } = this.props
    return (
      <span onClick={() => radicalClicked(radical.char)}>{radical.char}</span>
    )
  } 
}

