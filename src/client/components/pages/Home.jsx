import React from 'react';
import { Link } from 'react-router';

const Home = React.createClass({
	componentDidMount() {
    document.title = 'Creative Collider';
	},
  render() {
    return (
			<div className="site-wrapper">
				<div className="site-wrapper-inner">
					<div className="cover-container">
						<img className="header-logo" src="/creativecollider/public/assets/img/logo.svg" />
						<h1 className="cover-heading">Creative Collider</h1>
						<div className="embed-responsive embed-responsive-16by9 embed-responsive-margin">
							<iframe className="embed-responsive-item" width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameBorder="0" ></iframe>
						</div>
						<div className="pd-16">
							<Link to="/init" className="btn btn-lg btn-success">START</Link>
						</div>
					</div>
				</div>
			</div>
    )
  }
});

export default Home;