import React from 'react'
import {Button} from 'semantic-ui-react'
import colors from '../../../assets/palette'

const divStyles = {
    active: {
        backgroundColor: colors.catButtonActive,
        marginBottom: '5px'
    },
     inactive: {
         backgroundColor: colors.catButton,
         marginBottom: '5px'
    }
}

function CatButton(props) {
    return (
        <Button
            style={props.currentCat===props.cat ?
                divStyles.active:
                divStyles.inactive
            } 
            color={colors.catButtons}
            size='tiny' 
            circular={colors.catButtonCircle}
            onClick={()=>{props.catFilter(props.cat)}}
            >{props.cat}
        </Button>
    )
}

export default CatButton