import React from 'react'
import ToLogout from './toLogout'
import ToLogin from './toLogin'

function Login(props) {
    return (
        <div>
            {props.loggedIn ?
                <ToLogout
                    username={props.username}
                    toggleLogin={props.toggleLogin}
                /> :
                <ToLogin
                    toggleLogin={props.toggleLogin}
                 />
            }
        </div>
    )
}


export default Login