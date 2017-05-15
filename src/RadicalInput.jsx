import React, { Component } from 'react'

export default class RadicalInput extends Component {
  render() {
    const { enterPressed } = this.props
    return(
      <div style={styles.radicalInputLabel}>
        Search Anything 
        <div>
          <input 
            onKeyDown={(e) => enterPressed(e, e.target.value.trim() )}
            style={styles.radicalInput}
          />
        </div>
      </div>
    )
  }
}

const styles = {
  radicalInputLabel: {
    textAlign: 'center'
  },
  radicalInput: {
    fontSize: '1.3em'
  }
}
