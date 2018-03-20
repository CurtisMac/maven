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
            cats: [],
            articles: [],
            currentCat: 'all'
        }
    }

    componentWillMount() {
        let data = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYWM3MTdjMTYyNTBkNDU3MGVjNjNjMCIsImlhdCI6MTUyMTMxNzM3MCwiZXhwIjoxNTIxNTc2NTcwfQ.UQJ4sQb-TFyTRXzeeT6IJXzVfTJ1d2ULlY3XEBl6siM'}
        axios.post('http://localhost:8080/profile', {
            something: 'else',
            token: data
        })
            .then(response => {
                console.log(response.data)
                this.setState({
                    cats: response.data.categories,
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
                    currentCat={this.state.currentCat}
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