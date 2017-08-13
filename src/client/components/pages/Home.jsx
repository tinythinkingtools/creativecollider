import React from 'react';

import Logo from '../helpers/Logo';

const Home = React.createClass({
	componentDidMount() {
    document.title = 'Creative Collider';
	},
  render() {
    return (
			<div className="site-wrapper">
				<div className="site-wrapper-inner">
					<div className="cover-container">
						<Logo />
						<h1 className="cover-heading">Creative Collider</h1>
            <h4>&lt; mashup anything &gt;</h4>
            <br />
						<div className="pd-16">
							<a href="/creativecollider/init" className="btn btn-lg btn-cc">START</a>
						</div>
					</div>
				</div>
			</div>
    )
  }
});

export default Home;
