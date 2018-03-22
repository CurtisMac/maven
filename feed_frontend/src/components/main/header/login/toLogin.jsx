import React, { Component } from 'react'
import { Dropdown, Icon, Form } from 'semantic-ui-react'
import axios from 'axios'
import config from '../../../../assets/config'

class ToLogin extends Component {
    constructor() {
        super()
        this.state = {
            visible: false
        }
    }

    handleChange = (e, { name, value }) => {
        this.setState({
            [name]: value 
            
        })
    }

    handleSubmit = () => {
        this.setState({
            username: '',
            password: ''
        })
        axios.post(`${config.serverUrl}/login`, {
            username: this.state.username,
            password: this.state.password
        })
            .then(response => {
                if(response.data.success){
                    console.log(response.data.token)
                    localStorage.setItem('token', JSON.stringify(response.data.token))
                    this.props.toggleLogin()
                } else {
                    alert('Wrong username/password combination!')
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    render() {
        const trigger = (
            <span>
                <Icon name='user circle' />
                Please Sign-In
            </span>
        )

        return (
            <Dropdown
                trigger={trigger}
                direction={'left'}
                open={this.state.visible}
                onFocus={() => {
                    this.setState({
                        visible: true
                    })
                }}
                onBlur={() => {
                    this.setState({
                        visible: false
                    })
                }}
            >
                <Dropdown.Menu>
                    <Dropdown.Item>
                        <Form
                            onSubmit={this.handleSubmit}
                        >
                                <Form.Input
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Username:'
                                    tabIndex={1}
                                    name='username'
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    icon='key'
                                    iconPosition='left'
                                    placeholder='Password:'
                                    type='password'
                                    tabIndex={2}
                                    name='password'
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <Form.Button content='Submit' />
                        </Form>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default ToLogin