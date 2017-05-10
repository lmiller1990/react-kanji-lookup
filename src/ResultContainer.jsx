import React from 'react'

export default class ResultContainer extends React.Component { 
  render() {
    const { words } = this.props

    return (
      <div>
        <h4>Results: {words.length}</h4>  
        <table>
          <tbody>
            { words.map(w => {
              return (
                <tr key={w.id}>
                  <td>
                    {w.word}
                  </td>
                  <td>
                    {w.meaning}
                  </td>
                </tr>
              )
            }) }
        </tbody>
        </table>
      </div>
    )
  }
a
