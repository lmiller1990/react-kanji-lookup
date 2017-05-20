import React, { Component } from 'react'
import ResultContainer      from './ResultContainer'
import QueryInput           from './QueryInput'
import axios from 'axios'
import './styles/app.css'
import { latin }            from './utils/query.js'

class App extends Component {         
  state = {
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

  query = (event, query) => {
    if (event.which === 13 || event.type === 'click') {
      query = latin(query)
      let _q = query.split("|")

      if (_q.length === 1) {
        this.queryForDefintion(query)
      } else if (_q.length > 1) {
        let _kanji = _q[0].split(",")
        let _radicals = _q[1].split(",")
        let _length = _q[2] || 0
        this.queryByKanjiAndRadicals(_kanji, _radicals, _length)
      }
    }
  }

  render() {
    return (
      <div className="app">
        <QueryInput enterPressed={this.query} />

        <ResultContainer 
          className="result area" 
          words={this.state.words}
        />
      </div>
    );
  }
}

export default App
