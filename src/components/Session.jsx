import React, { Component } from 'react'
import * as Unicons from '@iconscout/react-unicons';

class Session extends Component {
  render() {
    return (
      <div className={this.props.class}>
          <div className='arrow' ><Unicons.UilArrowCircleUp className="arrowSymbol" onClick={this.props.handleMinutesIncre}/></div>
          <div className='sessionLength'><h1>{this.props.time}</h1></div>
          <div className='arrow' ><Unicons.UilArrowCircleDown className="arrowSymbol" onClick={this.props.handleMinutesDecre}/></div>
      </div>
    )
  }
}

export default Session