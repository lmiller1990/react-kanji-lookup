import React from 'react'

export default class SelectedRadicalsContainer extends React.Component {
  render() {
    return (
      <div>
        Selected:
        { this.props.selected.map(rad => {
          return <span key={rad}>{rad}</span>
        }) }
      </div>
    )
  }
}
