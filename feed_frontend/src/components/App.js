import React, { Component } from 'react'
import Main from './main'
import axios from 'axios'
// import {Container} from 'semantic-ui-react'

class App extends Component {
  constructor(){
    super()
    this.state = {
      something: 'h1'
    }
  }

  render() {
    return (
      <div>
        <Main />
      </div>
    )
  }
}

export default App;
