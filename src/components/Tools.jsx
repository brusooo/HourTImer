import React, { Component } from 'react'
import * as Unicons from '@iconscout/react-unicons';


class Tools extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         settingsOpen : false,
      }
    }

    settingsOption = () =>{
        this.setState({
            settingsOpen : !this.state.settingsOpen 
        })
    }
    
    render() {

        return (
            <div className='tools'>
                <div className='settingsLogo' onClick={this.settingsOption}>
                    <Unicons.UilCog className="settingIcon" onClick={this.props.toolsHandleEverything}/>
                </div>


                <div className={`settings ${this.state.settingsOpen ? 'active' : 'inactive'}`}>
                    <Unicons.UilStopwatch className="toolsIcon" onClick={this.props.toolsSessionContainer}/>
                    <Unicons.UilStopwatchSlash className="toolsIcon" onClick={this.props.toolsBreakContainer}/>
                </div>
            </div>
        )
    }
}

export default Tools