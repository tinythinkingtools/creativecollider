import React from 'react';
import { Link } from 'react-router';
import Tabletop from 'tabletop';

import Logo from '../helpers/Logo';

const Init = React.createClass({
	getInitialState() {
    return {
     	spreadsheetsURL: '',
			validateError: false,
			spreadsheetId: false
    }
  },
	componentDidMount() {
    document.title = 'Creative Collider';
	},
	
	/**
   * Change the spreadsheetsURL parameter.
   *
   * @param {object} event - the JavaScript event object
   */
	validateURL(event)  {
		const resourceUrl = event.target.value;
		let validateError = false;
		let spreadsheetId = false;
		// console.log(resourceUrl);
		if (resourceUrl) {
			// first we need check URL
			let spreadsheetIdRegExp = new RegExp("/spreadsheets/d/([a-zA-Z0-9-_]+)").exec(resourceUrl);
			if (spreadsheetIdRegExp) {
				// if url is correct get ID spreadsheet
				spreadsheetId = spreadsheetIdRegExp[1];
				// and try to take table through Tabletop
				const tabletop = Tabletop.init({ 
					key: spreadsheetId, 
					simpleSheet: true,
					callback: (data, tabletop) => {
						// if success => write spreadsheetId and activate GO button
						this.setState({
							spreadsheetId
						});
					},
				})
			} else {
				validateError = true;
			}
		} 
    this.setState({
      spreadsheetsURL: resourceUrl,
			validateError
    });
  },
  render() {
    return (
			<div className="site-wrapper">
				<div className="site-wrapper-inner">
					<div className="cover-container">
						<Logo goto="/creativecollider" />
						<h1 className="cover-heading">Creative Collider</h1>
						<div className={ this.state.validateError ? "form-group align-left pt-50 has-error" : "form-group align-left pt-50" } >
							<input 
								type="text"
								value={this.state.spreadsheetsURL} 
								name="spreadsheetsURL"
								onChange={this.validateURL} 
								placeholder="Paste a link to your published google spreadsheet here..." 
								className="form-control" />
							{ this.state.validateError ? <span className="help-block">Please check your url</span> : '' }
						</div>
						<div className="pd-16">
							<Link to={ this.state.spreadsheetId ? `/creativecollider/live/${this.state.spreadsheetId}` : '#' } className="btn btn-lg btn-cc" disabled={ this.state.spreadsheetId ? false : true }>GO</Link>
						</div>
						<p>
							The first step is publishing your Google Sheet (Without this, we can not access it). We will treat every column (up to 4 of them, ignoring the rest) as a separate item type. We will also ignore the first row, assuming it’s names. We will present you with random mix & matches of various types. If there is just one column - we will mix and match inside it, two items at a time. Take a look at the example spreadsheet.
						</p>
					</div>
				</div>
			</div>
    )
  }
});

export default Init;
