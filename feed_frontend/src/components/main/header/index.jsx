import React from 'react'
import colors from '../../../assets/palette'
import CatButton from './catButton'
import { Icon, Segment, Checkbox } from 'semantic-ui-react'
import Login from './login'

const divStyles = {
    container: {
        marginBottom: 0,
        marginTop: 0,
        border: 0
    },
    bottom: {
        borderRadius: 0,
        marginBottom: 0,
        marginTop: 0,
        border: 0
    },
    h1: {
        color: colors.text,
        fontFamily: 'Mina',
    }
}

function Header(props) {
    const catButtons = props.cats.length < 2 ?
        null :
        props.cats.map((obj, i) => {
            return <CatButton
                key={obj.id}
                cat={obj.name}
                catFilter={props.catFilter}
                currentCat={props.currentCat}
            />
        })
    return (
        <Segment.Group style={divStyles.container}>
            <Segment.Group horizontal >
                <Segment
                    color={colors.primary}
                    inverted>
                    <h1
                        style={divStyles.h1}
                    >Maven
                        </h1>
                </Segment>
                <Segment
                    style={divStyles.container}
                    color={colors.primary}
                    textAlign={'right'}
                    inverted
                >
                    <Login
                        username={props.username}
                        toggleLogin={props.toggleLogin}
                        loggedIn={props.loggedIn}
                        refreshData={props.refreshData}
                        resetData={props.resetData}
                    />
                </Segment>
            </Segment.Group>
            <Segment
                color={colors.primary}
                inverted
                textAlign={'center'}>
                {catButtons}
            </Segment>
            <Segment.Group horizontal style={divStyles.container}>
                <Segment
                    style={divStyles.bottom}
                    color={colors.secondary}
                    inverted
                    secondary
                >
                    <Icon
                        name='sidebar'
                        size={'large'}
                        onClick={props.menuToggle}
                    />

                </Segment>
                <Segment
                    style={divStyles.bottom}
                    color={colors.secondary}
                    inverted
                    secondary
                    textAlign={'right'}
                >
                    <Checkbox
                        toggle
                        label='Sort'
                        onChange={()=>{props.sortMethod()}}
                    /> 

                </Segment>
            </Segment.Group>
        </Segment.Group >

    )
}

export default Header