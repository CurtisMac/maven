import React, { Component } from 'react'
import { Menu, Icon, Input, Button } from 'semantic-ui-react'

import AddCat from './addCat'

class EditCats extends Component {

    render() {
        return (
            <Menu.Item name='Edit Categories'>
                <Icon name='pencil' />
                <Menu.Header>Edit Categories</Menu.Header>
                <Menu.Menu>
                    <Menu.Item name='Add Category'>
                        <Menu.Header>Add Category</Menu.Header>
                        <AddCat />
                    </Menu.Item>
                    <Menu.Item name='Remove Category' />
                </Menu.Menu>
            </Menu.Item>
        )
    }
}

export default EditCats