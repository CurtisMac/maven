import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'
import colors from '../../../assets/palette'

const divStyles = {
    marginTop: 3
}

class CatButton extends Component {
    render(){
        return (
            <Button
                style={divStyles} 
                color={colors.catButtons}
                size='tiny' 
                circular={colors.catButtonCircle}
                onClick={()=>{this.props.catFilter(this.props.cat)}}
                >{this.props.cat}
            </Button>
        )
    }
}

export default CatButton