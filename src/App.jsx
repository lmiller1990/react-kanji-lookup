import React, { Component } from 'react';
import RadicalLine from './RadicalLine'
import SelectedRadicalsContainer from './SelectedRadicalsContainer'

import radicals from './assets/radicals'
import charsWithRadicals from './assets/charsWithRadicals'

class App extends Component {         
  state = {
    selectedRadicals: []
  }

  getRadicals = () => {
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

  radicalClick = (radical) => {
    if (!this.state.selectedRadicals.includes(radical)) {
      let _radicals = [radical, ...this.state.selectedRadicals]
      this.setState({selectedRadicals: _radicals})
    }
  }

  render() {
    return (
      <div>
        { this.getRadicals().map(radicalLine => 
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
