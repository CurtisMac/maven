import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'

const divStyles = {
    marginTop: 3
}

class CatButton extends Component {
    render(){
        return (
            <Button
                style={divStyles} 
                circular 
                inverted 
                size='tiny' 
                color='white'
                >{this.props.str}
            </Button>
        )
    }
}

export default CatButton