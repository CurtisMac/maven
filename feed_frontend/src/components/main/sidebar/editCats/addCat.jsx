import React, { Component } from 'react'
import { Menu, Icon, Input, Button } from 'semantic-ui-react'

class AddCat extends Component {

    submit = (e) => {
        e.preventDefault()
        let entry = this.newText.value
        this.newText.value = ''
        if (entry === '') {
            alert(`You didn't enter a task!`)
        } else {
            console.log(entry)
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