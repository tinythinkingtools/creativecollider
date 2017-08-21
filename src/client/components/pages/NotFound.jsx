import React from 'react';
import { Router, Link } from 'react-router';
import Logo from '../helpers/Logo';

const NotFound = React.createClass({
	componentDidMount() {
    document.title = 'Creative Collider';
	},
  render() {
    return (
			<div className="site-wrapper">
				<div className="site-wrapper-inner">
					<div className="cover-container">
						<Logo goto="/creativecollider" />
						<h1 className="cover-heading">404</h1>
            <br />
            <p>
              Sorry, we couldn't find this page...
            </p>
						<div className="pd-16">
              <Link to="/creativecollider" className="btn btn-lg btn-cc">Back to the start...</Link>
						</div>
					</div>
				</div>
			</div>
    )
  }
});

export default NotFound;
