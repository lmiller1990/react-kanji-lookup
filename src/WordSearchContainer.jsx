import React from 'react'

export default class WordSearchContainer extends React.Component {
  render() {
    return(
      <button onClick={() => this.fetchWords()}>
        Search
      </button>
    )
  }
}
