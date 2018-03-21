import React, { Component } from 'react'
import axios from 'axios'
import config from '../../assets/config'
import palette from '../../assets/palette'

import {
    Button,
    Container,
    Divider,
    Dropdown,
    Message,
    Segment,
    Menu,
    Icon,
    Image,
    Sidebar
} from 'semantic-ui-react'

//Import components here
import Header from './header'
import LeftMenu from './sidebar'
import Articles from './articles'

class Main extends Component {
    constructor() {
        super()
        this.state = {
            cats: ['All'],
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

    menuToggle = () => {
        this.setState({
            menuVisible: !this.state.menuVisible
        })
    }
    
    // this.setState({ menuVisible: !this.state.menuVisible })

    componentDidMount() {
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYWM3MTdjMTYyNTBkNDU3MGVjNjNjMCIsImlhdCI6MTUyMTU3Njg0MywiZXhwIjoxNTIxODM2MDQzfQ.IM4huDfZs5Yzy_UZNyz01kNtkPqQB2DbHA8Ddy_C2D8'
        axios.post(`${config.serverUrl}/profile`, {
            token: token,
        })
            .then(response => {
                let cats = this.state.cats.concat(response.data.categories)
                this.setState({
                    cats: cats,
                    articles: response.data.articles
                })
            })
            .catch(e => {
                console.log(e)
            })
    }


    render() {
        return (
            <div>
                <Header
                    cats={this.state.cats}
                    catFilter={this.catFilter}
                    menuToggle={this.menuToggle}
                />
                <Sidebar.Pushable attached="bottom">
                    <Sidebar 
                        as={Menu} 
                        animation='overlay' 
                        width='wide' 
                        visible={this.state.menuVisible} 
                        // icon='labeled' 
                        vertical 
                        inverted
                        >
                        <LeftMenu />
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