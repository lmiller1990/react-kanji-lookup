import React, { Component } from 'react'
import ResultContainer      from './ResultContainer'
import RadicalInput         from './RadicalInput'
import axios from 'axios'
import './styles/app.css'

import charsWithRadicals from './assets/charsWithRadicals'

class App extends Component {         
  state = {
    selectedRadicals: [],
    matchedKanji: [],
    radicals: [],
    words: []
  }

  componentDidMount() {
    axios.get('/radicals/index')
      .then((res) => {
        this.setState({ radicals: res.data })
      })
  }

  queryByKanjiAndRadicals(kanji, radicals, length) {
    axios.get('japanese_words/meaning_by_kanji_and_radicals',{
      params: {
        kanji: kanji,
        radicals: radicals,
        length: length
      }
    }).then((res) => { 
      this.setState({ words: res.data })
    })
  }

  queryForDefintion(word) {
    axios.get('/japanese_words/meaning', {
      data: {},
      params: {
        word: word
      }
    }).then((res) => { 
      this.setState({ words: res.data })
    })
  }

  queryApi() {
    axios.get('/japanese_words/words_by_radicals', {
      data: {},
      params: {
        radicals: this.state.selectedRadicals
      }
    }).then((res) => { 
      let data = res.data.sort((a, b) => a.word.length > b.word.length ? 1 : -1)
      this.setState({ words: data }) 
    })
  }

  clearSelectedRadicals() {
    this.setState({ selectedRadicals: [] })
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

  handleEnterPressed = (event, query) => {
    if (event.which === 13 || event.type === 'click') {
      let _length = 0
      if (query.includes("*") || query.includes("＊")) {
        // length
        let _q = query.split(/＊|\*/)
        query = _q[0]
        _length = _q[1]
      }
        
      if (query.includes("<") || query.includes("＜")) {
        // word search + radical
        let queryArr = query.split(/<|＜/)
        let _kanji = queryArr[0].split(/,|、/)
        let _radicals = queryArr[1].split(/,|、/)
        this.queryByKanjiAndRadicals(_kanji, _radicals, _length)
      } else {
        // just a word
        this.queryForDefintion(query)
      }
    }
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
        <RadicalInput enterPressed={this.handleEnterPressed} />
        <button onClick={() => {this.queryApi()}}>Query</button>

        <ResultContainer 
          className="result area" 
          words={this.state.words}
        />
        {/*<SelectedRadicalsContainer selected={this.state.selectedRadicals} />
        <div className="radical select area">
          { this.getRadicalsByStroke().map(radicalLine => 
            <RadicalLine 
              key={radicalLine.id} 
              radicalLine={radicalLine.radicals} 
              radicalClicked={this.radicalClick}
            />
          ) }
        </div>
        */}
      </div>
    );
  }
}

export default App
