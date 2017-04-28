import React, { Component } from 'react';
import Radical from './Radical'
import radicals from './radicals'

class App extends Component {         
  state = {
  }
  getRadicals = () => {
    let arr = [], temp = []
    let strokes, prevStrokes = "1"
    for (let r in radicals)  {
      strokes = radicals[r].strokes  
      temp.push(radicals[r])
      if (radicals[r].strokes !== prevStrokes) {
        arr.push(temp)
        temp = []
        prevStrokes = strokes
      }
    }
  }

  componentDidMount() {
    this.getRadicals()
  }

  shouldLineBreak = (strokeCount) => {
    return this.state.previousStroke !== strokeCount ?
      '<br />' : ''
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default App;
