import React from 'react'
import './styles/radical.css'

export default class Radical extends React.Component {
  render() {
    const { radicalClicked, radical } = this.props
    let rotation = (Math.random() * 4)
    rotation = Math.random() > 0.5 ? rotation *= -1 : rotation
    return (
      <div 
        className="radical character"
        style={{ WebkitTransform: `rotate(${rotation}deg)` }}
        onClick={() => radicalClicked(radical)}
      >
        {radical}
      </div>
    )
  } 
}

