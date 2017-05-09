import React from 'react'
import Radical from './Radical'
import './styles/radical-line.css' 

export default class RadicalLine extends React.Component {
  shouldComponentUpdate() {
    return false // never need to update, the radicals never change.
  }

  render() {
    const { radicalLine, radicalClicked } = this.props
    let renderList = []
    renderList.push(
      <span 
        className="stroke count label"
        key={radicalLine[0].strokes}
      >
        {radicalLine[0].strokes}
      </span>
    )
    for (let r in radicalLine) {
      renderList.push(
        <Radical 
          key={radicalLine[r].character} 
          radical={radicalLine[r].character} 
          radicalClicked={radicalClicked}
        />
      )
    }
    return ( 
      <div 
        className="radical line container"
      >
        { renderList.map(radicalLine => radicalLine) }
      </div>
    )
  }
}
