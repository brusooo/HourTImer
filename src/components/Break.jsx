import React, { Component } from 'react'
import * as Unicons from '@iconscout/react-unicons';

class Break extends Component {
  render() {
    return (
        <div className={this.props.class}>
        <div className='arrow' ><Unicons.UilArrowCircleUp className="arrowSymbol" onClick={this.props.handleBreakLengthIncre}/></div>
        <div className='sessionLength'><h1>{this.props.length}</h1></div>
        <div className='arrow' ><Unicons.UilArrowCircleDown className="arrowSymbol" onClick={this.props.handleBreakLengthDecre}/></div>
    </div>
    )
  }
}

export default Break