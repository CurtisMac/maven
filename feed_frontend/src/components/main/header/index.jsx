import React, { Component } from 'react'
import colors from '../../../assets/palette'
import CatButton from './catButton'
import { Icon, Segment } from 'semantic-ui-react'
import Login from './login'

const divStyles = {
    container: {
        marginBottom: 0,
        border: 0
    },
    bottom: {
        borderRadius: 0
    },
    h1: {
        color: colors.text
    }
}

class Header extends Component {
    render() {
        const catButtons = this.props.cats.map((obj, i) => {
            return <CatButton
                key={obj.id}
                cat={obj.name}
                catFilter={this.props.catFilter}
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
                        <Login />
                    </Segment>
                </Segment.Group>
                <Segment
                    color={colors.primary}
                    inverted
                    textAlign={'center'}>
                    {catButtons}
                </Segment>
                <Segment
                    style={divStyles.bottom}
                    color={colors.secondary}
                    inverted
                    secondary
                >
                    <Icon
                        name="sidebar"
                        onClick={this.props.menuToggle}
                    />
                </Segment>
            </Segment.Group >




            // <div style={divStyles}>
            //     <h1 style={divStyles.h1}>Maven</h1>
            //     <nav style={divStyles.nav}>{catButtons}</nav>
            //     <Icon name="sidebar" onClick={this.props.menuToggle}/>
            // </div >
        )
    }
}

export default Header