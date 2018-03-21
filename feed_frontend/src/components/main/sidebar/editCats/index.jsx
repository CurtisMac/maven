import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'

import AddCat from './addCat'
import RemoveCat from './removeCat'

class EditCats extends Component {
    constructor(){
        super()
        this.state = {
            activeView: 'none'
        }
    }
    render() {
        return (
            <Menu.Item name='Edit Categories'>
                <Icon name='pencil' />
                <Menu.Header 
                    onClick={()=>{this.setState({activeView:'none'})}}>
                    Edit Categories
                </Menu.Header>
                <Menu.Menu>
                    <Menu.Item 
                        name='Add Category' 
                        active={this.state.activeView==='add'}>
                        <Menu.Header
                            onClick={() => { this.setState({ activeView: 'add' }) }}
                            >Add Category
                        </Menu.Header>
                        {this.state.activeView === 'add' ? 
                            <AddCat updateCats={this.props.updateCats}/> : 
                            null}
                    </Menu.Item>
                    <Menu.Item 
                        name='Remove Category'
                        active={this.state.activeView === 'remove'}>
                        <Menu.Header
                            onClick={() => { this.setState({ activeView: 'remove' }) }}
                            >Remove Category
                        </Menu.Header>
                        {this.state.activeView === 'remove' ? 
                            <RemoveCat updateCats={this.props.updateCats}/> 
                            : 
                            null}
                    </Menu.Item>
                </Menu.Menu>
            </Menu.Item>
        )
    }
}

export default EditCats