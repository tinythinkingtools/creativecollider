import React from 'react';
import { Router, Link } from 'react-router';
import Logo from '../helpers/Logo';

const Howto = React.createClass({
	componentDidMount() {
    document.title = 'Creative Collider';
	},
  render() {
    return (
			<div className="site-wrapper">
				<div className="site-wrapper-inner">
					<div className="cover-container">
						<Logo goto="/creativecollider/init" />
						<h1 className="cover-heading">How to Collide?</h1>
            <br />
            <p>
              blah blah blah here is some howto.
            </p>
						<div className="pd-16">
              <Link to="/creativecollider/init/" className="btn btn-lg btn-cc">GOT IT</Link>
						</div>
					</div>
				</div>
			</div>
    )
  }
});

export default Howto;
