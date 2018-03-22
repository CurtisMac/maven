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
                    resetData={props.resetData}
                /> :
                <ToLogin
                    toggleLogin={props.toggleLogin}
                    refreshData={props.refreshData}
                 />
            }
        </div>
    )
}


export default Login