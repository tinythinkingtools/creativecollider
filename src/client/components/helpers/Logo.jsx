import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
const Logo = React.createClass({

  handleClick() {
    if(this.props.goto) {
      browserHistory.push(this.props.goto)
    }
  },
  
  render() {
    return (
        <div className="logoContainer" onClick={this.handleClick}>
          <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89.4 66.91"><path d="M.4,63.4s30.4,2.7,38.1-29.1H28.6L45.1,5.7,61.6,34.3H51.3s5.9,30.3,38.5,29.1v9.1S58.2,75.1,45.1,43.8c0,0-10.1,29.4-44.7,28.8Z" transform="translate(-0.4 -5.7)"/></svg>
        </div>
    )
  }

});

export default Logo;
