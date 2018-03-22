import React, { Component } from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'

class ToLogout extends Component {
    handleChange = (e, { value }) => {
        //'if' not strictly necessary, it is here to allow for more options to be added to dropdown in future
        if(value==='logout'){
            this.props.toggleLogin()
            localStorage.removeItem('token')
            this.props.resetData()
        }
    }

    render() {
        const trigger = (
            <span>
                <Icon name='user circle' />
                Hello, {this.props.username}
            </span>
        )

        const options = [
            {
                key: 'user',
                text:
                    <span>
                        Signed in as <strong>{this.props.username}</strong>
                    </span>,
                disabled: true,
            },
            {
                key: 'sign-out',
                text: 'Sign Out',
                value: 'logout'
            },
        ]
        return (
            <Dropdown
                trigger={trigger}
                options={options}
                closeOnBlur={true}
                direction={'left'}
                onChange={this.handleChange}
            />
        )
    }
}

export default ToLogout