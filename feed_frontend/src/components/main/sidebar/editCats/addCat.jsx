import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import config from '../../../../assets/config'
import axios from 'axios'

class AddCat extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    handleSubmit = () => {
        let entry = this.state.name
        if(entry){
            axios.post(`${config.serverUrl}/categories`, {
                token: config.token,
                method: 'push',
                cat: entry
            })
                .then(response => {
                    this.props.refreshData()
                })
                .catch(e => {
                    console.log(e)
                })
        }
        this.setState({ name: '' })
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Input
                    placeholder='Enter a category'
                    name='name'
                    value={this.state.name}
                    action='Add'
                    onChange={this.handleChange}
                />
            </Form>
        )
    }
}

export default AddCat