import React, { Component } from 'react';
import RadicalLine from './RadicalLine'
import SelectedRadicalsContainer from './SelectedRadicalsContainer'

import radicals from './assets/radicals'
import charsWithRadicals from './assets/charsWithRadicals'

class App extends Component {         
  state = {
    selectedRadicals: [],
    matchedKanji: []
  }

  // sort radicals into arrays by radical.
  // [ [ one stroke radicals ], [ two stroke radicals ] ] 
  // and so on.
  getRadicalsByStroke = () => {
    let arr = [], radicalsArr = []
    let strokes, prevStrokes = "1"
    for (let r in radicals)  {
      strokes = radicals[r].strokes  
      radicalsArr.push({ id: r, ...radicals[r] })
      if (radicals[r].strokes !== prevStrokes) {
        arr.push({ id: prevStrokes, radicalsArr })
        radicalsArr = []
        prevStrokes = strokes
      }
    }
    return arr
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
      this.setState({selectedRadicals: _radicals},
        () => this.checkForCharactersContainingRadicals())
    }

  }

  render() {
    return (
      <div>
        { this.getRadicalsByStroke().map(radicalLine => 
          <RadicalLine 
            key={radicalLine.id} 
            radicalLine={radicalLine.radicalsArr} 
            radicalClicked={this.radicalClick}
          />
        ) }
      <SelectedRadicalsContainer selected={this.state.selectedRadicals} />
      </div>
    );
  }
}

export default App;
