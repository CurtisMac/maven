import React, { Component } from 'react'
import Main from './main'

class App extends Component {
//App is reduntant with only one component, left as it to allow for future expansion 
  render() {
    return (
      <div>
        <Main />
      </div>
    )
  }
}

export default App;
