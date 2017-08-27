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
            <div className="cc-description-list-container">
              <ol>
                <li>Create a new google spreadsheet.</li>
                <li>Populate it (alone or with friends) with one or more columns of data that you want to mash up. Use the first row to name the columns. <a href="https://docs.google.com/spreadsheets/d/1-pvX75c3nSdK57rKDjIguQXiWkPg-UP9MOO4iPCW9Jw/edit?usp=sharing" target="_blank">Here</a> is an example.</li>
                <li>Publish the spreadsheet to the web by going to File -> Publish to the web. Click publish and then copy the link.</li>
                <li>Go to Creative Collider, hit start and then paste the link into the input field.</li>
                <li>View a "slideshow" of your data, mashed up in random ways. If you used only one column in your spreadsheet then the system will show random combinations of different items in that column. If between 2 and 4 columns were used, then a random element will be taken from each column every time a "slide" changes. Columns numnber 5 and beyond are ignored.</li>
                <li>Data can be text, links, images (links to .jpg, .png, .gif files are rendered as pics automatically) or markdown (detected automatically).</li>
                <li>Watch the items mash up (or move ahead manually by clicking the arrows at the bottom). When the creative spark hits you, close the page and go do something awesome!</li>
              </ol>
            </div>
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
