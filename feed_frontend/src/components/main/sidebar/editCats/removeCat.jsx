import React, { Component } from 'react'
import { Button, Form, Dropdown } from 'semantic-ui-react'
import config from '../../../../assets/config'
import axios from 'axios'

class RemoveCat extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    handleChange = (e, { value }) => {
        this.setState({ selected: value })
    }

    handleSubmit = () => {
        if (this.state.selected) {
            console.log(this.state.selected)
            axios.post(`${config.serverUrl}/categories`, {
                token: config.token,
                method: 'pull',
                cat: this.state.selected
            })
                .then(response => {
                    console.log(response)
                    this.props.refreshData()
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }


    render() {
        const selectCat = this.props.cats.map(
            (cat, i) => {
                return {
                    text: cat.name,
                    value: cat.id,
                    key: i
                }
            })
        return (
            <Button.Group onClick={this.handleSubmit}>
                <Dropdown
                    onChange={this.handleChange}
                    placeholder='Select category'
                    options={selectCat}
                    floating
                    button
                />
                <Button>Delete</Button>
            </Button.Group>


            // <Form onSubmit={this.handleSubmit}>
            //     <Dropdown
            //         placeholder='Select category'
            //         options={selectCat}
            //     />
            //     <Form.Button />
            // </Form>
        )
    }
}

export default RemoveCat