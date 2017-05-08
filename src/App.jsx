import React, { Component } from 'react'
import RadicalLine          from './RadicalLine'
import SelectedRadicalsContainer from './SelectedRadicalsContainer'
import WordSearchContainer       from './WordSearchContainer'
import axios from 'axios'
import './styles/app.css'

//import radicals          from './assets/allRadical'
import charsWithRadicals from './assets/charsWithRadicals'

class App extends Component {         
  state = {
    selectedRadicals: [],
    matchedKanji: [],
    radicals: []
  }

  componentDidMount() {
    axios.get('/radicals/index')
      .then((res) => {
        this.setState({ radicals: res.data })
      })
  }

  queryApi() {
    axios.get('/japanese_words/words_by_radicals', {
      data: {},
      params: {
        radicals: this.state.selectedRadicals
      }
    }).then((res) => { console.log(res) })
  }

  getRadicalsByStroke = () => {
    // get all stroke couts
    let strokeCounts = [] 
    let radicals = this.state.radicals
    for (let r in radicals) {
      if (!strokeCounts.includes(radicals[r].strokes)) {
        strokeCounts.push(radicals[r].strokes)
      }
    }
    let lines = []
    for (let s in strokeCounts) {
      lines.push({ id: s, radicals: [] })
    }
    for (let r in radicals) {
      lines[radicals[r].strokes - 1].radicals.push({ char: r, ...radicals[r] })
    }
    return lines
  }

  // every time a new radical is selected, check for characters containing
  // all selected radicals. Output how long it took.
  checkForCharactersContainingRadicals() {
    console.time("search")
    let sel = this.state.selectedRadicals
    let matched = []
    for (let c in charsWithRadicals) {
      if (sel.every(val => charsWithRadicals[c].radicals.includes(val)))  {
        matched.push(charsWithRadicals[c].character)
      }
    }
    console.log(matched)
    this.setState({matchedKanji: matched})
    console.timeEnd("search")
  }

  radicalClick = (radical) => {
    if (!this.state.selectedRadicals.includes(radical)) {
      let _radicals = [radical, ...this.state.selectedRadicals]
      console.log(_radicals)
      this.setState({selectedRadicals: _radicals},
        () => this.checkForCharactersContainingRadicals())
    }
  }

  render() {
    return (
      <div className="app">
        { this.getRadicalsByStroke().map(radicalLine => 
          <RadicalLine 
            key={radicalLine.id} 
            radicalLine={radicalLine.radicals} 
            radicalClicked={this.radicalClick}
          />
        ) }
        <SelectedRadicalsContainer selected={this.state.selectedRadicals} />
        <WordSearchContainer selected={this.state.selectedRadicals} />
        <button onClick={() => {this.queryApi()}}>Query</button>
      </div>
    );
  }
}

export default App
