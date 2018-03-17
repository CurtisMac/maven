import React, { Component } from 'react'
import Header from './header'
// import {Container} from 'semantic-ui-react'

class App extends Component {
  constructor(){
    super()
    this.state = {
      cats: ['seo', 'react', 'wordpress', 'javascript', 'node js', 'dogs', 'shaving', 'horses'],
      currentCat: 'all'
    }
  }

  render() {
    return (
      <div>
      <Header 
        cats={this.state.cats}
        currentCat={this.state.currentCat}
      />
        Hi
      </div>
    )
  }
}

export default App;
