import React, { Component, PropTypes } from 'react';


class Appbar extends Component {
  render(){
    return (
      <div className="appbar">
        <div className="title">{this.props.title}</div>
      </div>
    )
  }
}

export default Appbar
