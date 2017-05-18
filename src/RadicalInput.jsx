import React, { Component } from 'react'
import icon from './assets/search.png'

const styles = {
  radicalInputContainer: {
    textAlign: 'center'
  },
  radicalInput: {
    fontSize: '1.4em',
  },
  searchIcon: {
    verticalAlign: 'middle',
    height: '1.5em',
    paddingBottom: '0.5em',
    paddingLeft: '0.25em'
  }
}

export default class RadicalInput extends Component {
  render() {
    const { enterPressed } = this.props
    return(
      <div style={styles.radicalInputContainer}>
        Search Anything 
        <div>
            <input 
              onKeyDown={(e) => enterPressed(e, e.target.value.trim() )}
              style={styles.radicalInput}
            />
            <img 
              style={styles.searchIcon} 
              src={icon} 
              onKeyDown={(e) => enterPressed(e) }
              alt='searchIcon'
            />
        </div>
      </div>
    )
  }
}

