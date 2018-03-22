import React, { Component } from 'react'
import axios from 'axios'
import config from '../../assets/config'
// import palette from '../../assets/palette'

import {Menu, Sidebar} from 'semantic-ui-react'

//Import components here
import Header from './header'
import LeftMenu from './sidebar'
import Articles from './articles'

const divStyles = {
    minHeight: '800px'
}

class Main extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            username: 'curtis',
            cats: [],
            articles: [],
            currentCat: 'All',
            menuVisible: false
        }
    }

    catFilter = cat => {
        this.setState({
            currentCat: cat
        })
    }

    updateCats = (cat, method) => {
        let catArray = this.state.cats
        if (method === 'remove'){
            const i = catArray.indexOf(cat)
            if(i!==-1){catArray.splice(i, 1)}
        } else if (method === 'add'){
            catArray.push({ name: cat, id: 1 })
        }
        this.setState({
            cats:catArray
        })
    }

    refreshData = () => {
        let token = localStorage.getItem('token')
        console.log(token)
        if(token){
            console.log('hi')
            axios.post(`${config.serverUrl}/profile`, {
                token: JSON.parse(token),
            })
                .then(response => {
                    console.log(response.status)
                    if(response.status===200){
                        let originalCat = [{ name: 'All', id: 0 }]
                        let cats = originalCat.concat(response.data.categories)
                        this.setState({
                            cats: cats,
                            articles: response.data.articles,
                            loggedIn: true
                        })
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }

    menuToggle = () => {
        this.setState({
            menuVisible: !this.state.menuVisible
        })
    }

    toggleLogin = () => {
        this.setState({
            loggedIn: !this.state.loggedIn
        })

    }

    componentDidMount() {
        this.refreshData()
    }

    render() {
        return (
            <div>
                <Header
                    cats={this.state.cats}
                    catFilter={this.catFilter}
                    menuToggle={this.menuToggle}
                    username={this.state.username}
                    toggleLogin={this.toggleLogin}
                    loggedIn={this.state.loggedIn}
                />
                <Sidebar.Pushable attached="bottom"
                    style={divStyles}>
                    <Sidebar 
                        as={Menu} 
                        animation='overlay' 
                        width='wide' 
                        visible={this.state.menuVisible} 
                        vertical 
                        inverted
                        >
                        <LeftMenu 
                            refreshData={this.refreshData}
                            cats={this.state.cats}
                        />
                    </Sidebar>
                    <Sidebar.Pusher>
                            <Articles
                                currentCat={this.state.currentCat}
                                articles={this.state.articles}
                            />
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

export default Main