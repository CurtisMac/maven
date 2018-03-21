import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import EditCats from './editCats/index'

function LeftMenu(props) {
    return (
            <div>
                <Menu.Item name='home'>
                    <Icon name='home' />
                    Home
                </Menu.Item>
                <EditCats 
                    updateCats={props.updateCats}
                />
                <Menu.Item name='camera'>
                    <Icon name='camera' />
                    Channels
                </Menu.Item>
            </div>
    )
}

export default LeftMenu