import React, {Component} from 'react'
import colors  from '../../../assets/palette'
import CatButton from './catButton'
import { Menu, Icon } from 'semantic-ui-react'


const divStyles = {
    backgroundColor: colors.primary,  
    color: colors.text1,
    h1: {
        margin: 0,
        paddingTop: 10,
        paddingLeft: 10,
    },
    nav: {
        textAlign: 'center',
        paddingBottom: 10,
    }
}

class Header extends Component {
    render(){
        const catButtons = this.props.cats.map((str, i)=>{
            return <CatButton 
                        key={i} 
                        cat={str}
                        catFilter={this.props.catFilter}
                    />
        })
        return (
            <div style={divStyles}>
                <h1 style={divStyles.h1}>Maven</h1>
                <nav style={divStyles.nav}>{catButtons}</nav>
                <Icon name="sidebar" onClick={this.props.menuToggle}/>
            </div >
        )
    }
}

export default Header