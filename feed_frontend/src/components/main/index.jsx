import React, { Component } from 'react'
import axios from 'axios'
import config from '../../assets/config'
import {Menu, Sidebar, Dimmer, Loader} from 'semantic-ui-react'
import Header from './header'
import LeftMenu from './sidebar'
import Articles from './articles'
import LandingPage from '../landingPage'

const divStyles = {
    minHeight: '1100px',
    text: {
        fontFamily: 'Mina',
        textAlign: 'center',
        marginTop: '20px'
    },
    dimmer: {
        marginTop: '0'
    }
}

class Main extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            username: '',
            cats: [],
            articles: [false],
            currentCat: 'All',
            menuVisible: false,
            loading: false,
            sortBy: 'date'
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
        if(token){
            this.setState({
                loading: true
            })
            axios.post(`${config.serverUrl}/profile`, {
                token: JSON.parse(token),
            })
                .then(response => {
                    if(response.status===200 && response.data.success !== false){
                        let originalCat = [{ name: 'All', id: 0 }]
                        let cats = originalCat.concat(response.data.categories)
                        this.setState({
                            cats: cats,
                            articles: response.data.articles,
                            loggedIn: true,
                            username: response.data.username,
                            loading: false,
                            menuVisible: false,
                        })
                    } else {
                        this.setState({
                            loading: false
                        })
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }

    sortMethod = () => {
        if (this.state.sortBy === 'date') {
            this.setState({
                sortBy: 'rank'
            })
        } else if (this.state.sortBy === 'rank') {
            this.setState({
                sortBy: 'date'
            })
        }
    }

    resetData = ()=>{
        this.setState({
            cats: [],
            articles: [],
            username: ''
        })
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
                <Dimmer 
                    active={this.state.loading}
                    style={divStyles.dimmer}>
                    <Loader />
                </Dimmer>
                <Header
                    cats={this.state.cats}
                    catFilter={this.catFilter}
                    menuToggle={this.menuToggle}
                    username={this.state.username}
                    toggleLogin={this.toggleLogin}
                    loggedIn={this.state.loggedIn}
                    currentCat={this.state.currentCat}
                    refreshData={this.refreshData}
                    resetData={this.resetData}
                    sortMethod={this.sortMethod}

                />
                {this.state.loggedIn?
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
                                menuVisible={this.state.menuVisible}
                            />
                        </Sidebar>
                        <Sidebar.Pusher>
                            {!this.state.articles[0] ?
                            <div style={divStyles.text}>
                                <h1>Welcome to Maven, {this.state.username}!</h1>
                                <p>To get started, open the menu on the left and add some new categories. Categories are keywords, so should only be one or two words long</p>
                            </div>
                            :
                                <Articles
                                    currentCat={this.state.currentCat}
                                    articles={this.state.articles}
                                    sortBy={this.state.sortBy}
                                />
                            }
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                    :
                    <LandingPage />
                }
            </div>
        )
    }
}

export default Main