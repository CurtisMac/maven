import React from 'react'
import SignUp from './signUp'
import colors from '../../assets/palette'

const divStyles = {
    fontFamily: 'Mina',
    textAlign: 'center',
    marginTop: '20px'
}

function LandingPage() {
    return (
        <div >
            <h1 style={divStyles}>Welcome to Maven!</h1>
            <SignUp />
        </div>
    )
}

export default LandingPage