import React, { Component } from 'react';
import RadicalLine from './RadicalLine'
import radicals from './radicals'

class App extends Component {         
  state = {
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

  shouldLineBreak = (strokeCount) => {
    return this.state.previousStroke !== strokeCount ?
      '<br />' : ''
  }

  render() {
    return (
      <div>
        { this.getRadicals().map(radicalLine => 
          <RadicalLine key={radicalLine.id} radicalLine={radicalLine.radicalsArr} />
        ) }
      </div>
    );
  }
}

export default App;
