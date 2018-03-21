import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'
import config from '../../../../assets/config'
import axios from 'axios'

class AddCat extends Component {

    submit = (e) => {
        e.preventDefault()
        let entry = this.newText.value
        this.newText.value = ''
        if (entry === '') {
            alert(`You didn't enter a category!`)
        } else {
            axios.post(`${config.serverUrl}/categories`, {
                token: config.token,
                method: 'push',
                cat: entry
            })
                .then(response => {
                    console.log(response)
                    this.props.updateCats(entry, 'add')
                })
                .catch(e => {
                    console.log(e)
                })
        }

    }

    render() {
        return (
            <Input
                action
                placeholder='enter new category'>
                <input
                    type='text'
                    id='newCat'
                    ref={(input) => { this.newText = input }}>
                </input>
                <Button
                    type='submit'
                    onClick={this.submit}
                >Add
                </Button>
            </Input>
        )
    }
}

export default AddCat