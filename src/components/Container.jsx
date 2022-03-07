import React, { Component } from 'react'
import * as Unicons from '@iconscout/react-unicons';

import Tools from "./Tools"

class Container extends Component {
  render() {
    return (
      <div>

        <div className='timeContainer'>
          
          <div className='minutes'>
            <h1>{this.props.minutes}</h1>
          </div>
          <div className='divider'>
            <h1>:</h1>
          </div>
          <div className='seconds'>
            <h1>{this.props.seconds}</h1>
          </div>

          <Tools
            toolsSessionContainer={this.props.handleSessionContainer}
            toolsBreakContainer={this.props.handleBreakContainer}
            toolsHandleEverything={this.props.handleEverything}
          />

          <div className='controls'>
            <Unicons.UilPlayCircle onClick={this.props.startIt} className="controlIcon" />
            <Unicons.UilPauseCircle className="controlIcon" onClick={this.props.pauseIt} />
            <Unicons.UilHistory className="controlIcon" onClick={this.props.resetIt} />
          </div>

        </div>

      </div>
    )
  }
}

export default Container