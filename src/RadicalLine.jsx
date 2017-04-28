import React from 'react'
import Radical from './Radical'

export default class RadicalLine extends React.Component {
  render() {
    const { radicalLine } = this.props
    console.log('line',radicalLine)
    let renderList = []
    for (let r in radicalLine) {
      renderList.push(
        <Radical key={radicalLine[r].id} radical={radicalLine[r]} />
      )
    }
    return ( 
      <div>
        { renderList.map(radicalLine => radicalLine) }
      </div>
    )
  }
}
