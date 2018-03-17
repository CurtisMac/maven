import {Component} from 'react'
import {Sidebar} from 'semantic-ui-react'

class SideBar extends Component {
    state = { visible: true }
    render(){
        return(
            <div>
                This is a sidebar
            </div>
        )
    }
}