import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import EditCats from './editCats/index'

function LeftMenu(props) {
    return (
            <div>
                <Menu.Item name='home'>
                    <Icon name='home' />
                    Home
                </Menu.Item>
                <EditCats />
                <Menu.Item name='camera'>
                    <Icon name='camera' />
                    Channels
                </Menu.Item>
            </div>
    )
}

export default LeftMenu