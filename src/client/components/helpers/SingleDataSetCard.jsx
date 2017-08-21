import React from 'react';
import { Router, Link } from 'react-router';

const SingleDataSetCard = React.createClass({

  handleClick() {
    console.log('click on me: ' + this.props.name);
  },
  
  render() {
    return (
        <div className="SingleDataSetCard">
          <Link to={'/creativecollider/live/'+this.props.uid}>{this.props.name}</Link>
        </div>
    )
  }

});

export default SingleDataSetCard;
