import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import colors from '../../../assets/palette'
import axios from 'axios'
import config from '../../../assets/config'

const divStyles = {
    marginTop: '10%',
    marginLeft: '15px',
    marginRight: '15px',
}

class  SignUp extends Component {
    constructor(){
        super()
        this.state = {
            passwordOk: true,
            usernameOk: true,
            success: false

        }
    }

     handleChange = (e, { name, value }) => {
        this.setState({
            [name]: value 
        })
        axios.post(`${config.serverUrl}/signup`, {
            username: this.state.username,
        })
            .then(response => {
                if(response.data==='taken'){
                  this.setState({
                      usernameOk: false
                  })
                } else if (response.data==='available') {
                     this.setState({
                      usernameOk: true
                  })
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
    
    handleSubmit = () => {
           this.setState({
            username: '',
            password1: '',
            password2: ''
        })
        if(this.state.password1!==this.state.password2){
            alert('Passwords do not match!')
        } else if(!this.state.usernameOk){
            alert('Username taken!')
        }else{
        axios.put(`${config.serverUrl}/signup`, {
            username: this.state.username,
            password: this.state.password2
        })
            .then(response => {
                if(response.data.success){
                  alert('Success! \n Please Sign-In')
                } else {
                    alert('Error! \n Please try again')
                }
            })
            .catch(e => {
                console.log(e)
            })
        }
    }

    render() {
        return (
            <div style={divStyles}>
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header 
                            as='h2' 
                            color={colors.text2}
                            textAlign='center'>
                            Sign-up for a free account
                        </Header>
                        <Form 
                            size='large'
                            onSubmit={this.handleSubmit}
                        >
                            <Segment>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Username'
                                    name='username'
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    error={!this.state.usernameOk}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    name='password1'
                                    value={this.state.password1}
                                    onChange={this.handleChange}
                                />

                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Confirm Password'
                                    type='password'
                                    name='password2'
                                    value={this.state.password2}
                                    onChange={this.handleChange}
                                />

                                <Button 
                                    color={colors.signUpButton} 
                                    fluid 
                                    size='large'
                                    >Create Account
                                </Button>
                            </Segment>
                        </Form>
                         <p style={divStyles}>Already have an account? Sign-In above!</p>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default SignUp