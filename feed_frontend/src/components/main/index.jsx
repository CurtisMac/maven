import React, { Component } from 'react'
import axios from 'axios'
import config from '../../assets/config'

//Import components here
import Header from './header'
import Articles from './articles'

class Main extends Component {
    constructor() {
        super()
        this.state = {
            cats: ['All'],
            articles: [],
            currentCat: 'all'
        }
    }

    catFilter = (cat)=> {
        this.setState({
          currentCat: cat  
        })
    }

    componentDidMount() {
        let data = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYWM3MTdjMTYyNTBkNDU3MGVjNjNjMCIsImlhdCI6MTUyMTMxNzM3MCwiZXhwIjoxNTIxNTc2NTcwfQ.UQJ4sQb-TFyTRXzeeT6IJXzVfTJ1d2ULlY3XEBl6siM'}
        axios.post('http://localhost:8080/profile', {
            something: 'else',
            token: data
        })
            .then(response => {
                let cats = this.state.cats.concat(response.data.categories)
                this.setState({
                    cats: cats,
                    articles: response.data.articles
                })
            })
            .catch(e=>{
                console.log(e)
            })
    }


    render() {
        return (
            <div>
                <Header
                    cats={this.state.cats}
                    catFilter={this.catFilter}
                />
                <Articles 
                    currentCat={this.state.currentCat}
                    articles={this.state.articles}
                />
            </div>
        )
    }
}

export default Main