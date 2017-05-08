import React from 'react';
import Tabletop from 'tabletop';
import _ from 'lodash';
import ReactPlayer from 'react-player';


const Live = React.createClass({
	getInitialState() {
    return {
			dataCollider: {},
			spreadsheetId: false,
			ready: false,
			play: true,
			history: {},
			historyCount: 0,
			slideInterval: null,
			prevSlideNumber: 0,
			intervalTime: 4000,
			firstValue: {
				value: '',
				type: ''
			},
			secondValue: {
				value: '',
				type: ''
			}
    }
  },
	componentDidMount() {
    document.title = 'Creative Collider';
		const spreadsheetId = this.props.params.spreadsheetId;
		const tabletop = Tabletop.init({ 
			key: spreadsheetId, 
			callback: (data, tabletop) => {
				// console.log(data);
				// if success => write spreadsheetId and activate GO button
				
				
				
				this.setState({
					spreadsheetId,
					ready: true,
					dataCollider: data
				});
				this.renderNextValues(data);
				
				setTimeout(() => {
					const slideInterval = setInterval(this.renderNextValues, this.state.intervalTime);
					this.setState({
						slideInterval
					});
				}, 500)
			},
		})
	},
	
	loaderApp(){
		return (<div className="cover-container">
							<img className="header-logo" src="/assets/img/logo.svg" />
							<h1 className="cover-heading">Creative Collider - loading...</h1>
						</div>);
	},
	playPauseActions(){
		const play = this.state.play ? false : true;
		let slideInterval = this.state.slideInterval;
		
		if (play) {
			slideInterval = setInterval(this.renderNextValues, this.state.intervalTime);
		} else{
			clearInterval(slideInterval);
		}
		
		this.setState({
			play,
			slideInterval
		});
	},
	moveSlides(next = false){
		// console.log('prevSlideNumber', next);
		
		let historyCount = this.state.historyCount;
		let history = this.state.history;
		
		
		if (next) {
			historyCount = historyCount + 1;
		} else{
			historyCount = historyCount - 1;
		}
		
		if (this.state.play) {
			this.playPauseActions();
		}
		
		// console.log(Object.keys(history).length, historyCount);
		const firstValue = history[historyCount-1].firstValue;
		const secondValue = history[historyCount-1].secondValue;
		
		this.setState({
			firstValue,
			secondValue,
			historyCount
		});
	
	},
	nextSlide(){
		let historyCount = this.state.historyCount;
		let historyLength = Object.keys(this.state.history).length;
		
		// console.log('nextSlide', historyLength, historyCount);
		if (this.state.play) {
			this.playPauseActions();
		}
		
		if (historyLength) {
			if (historyLength !== historyCount) {
				this.moveSlides(true);
			} else{
				this.renderNextValues();
			}
		} else {
			this.renderNextValues();
		}
		
		
		
	},
	renderNextValues(data){
		const dataCollider = data ? data : this.state.dataCollider;
		// work only with first sheet
		const sheetName = Object.keys(dataCollider)[0];
		const sheet = dataCollider[sheetName];
		
		// let choose columns
		const firstColumnChoose = _.sample(sheet.columnNames);
		let secondColumnChoose = _.sample(sheet.columnNames);
		
		// if columns equals, try more
		if (secondColumnChoose === firstColumnChoose) {
			while(firstColumnChoose === secondColumnChoose) {
				// console.log('rerender', firstColumnChoose, secondColumnChoose);
				secondColumnChoose = _.sample(sheet.columnNames);
			}
		}
		
		// console.log(firstColumnChoose, secondColumnChoose);
		// create object who contain all values for each column
		const values = {
			'first': [],
			'second': []
		}
		
		sheet.elements.forEach((obj, index) => {
			if(!_.has(values.first, obj[firstColumnChoose]) && obj[firstColumnChoose]){
				values.first.push(obj[firstColumnChoose]);
			}
			
			if(!_.has(values.second, obj[secondColumnChoose]) && obj[secondColumnChoose]){
				values.second.push(obj[secondColumnChoose]);
			}
		});
		
		const firstValue = {
			value: _.sample(values.first)
		};
		
		firstValue.type = this.checkType(firstValue.value);
		
		const secondValue = {
			value: _.sample(values.second)
		};
		
		secondValue.type = this.checkType(secondValue.value);
		
		// put values in history  
		let history = this.state.history;
		let historyCount = Object.keys(history).length;
		history[historyCount] = {
			firstValue,
			secondValue
		};
		historyCount = Object.keys(history).length;
		// console.log('historyCount new', historyCount, history);

		
		this.setState({
			firstValue,
			secondValue,
			history,
			historyCount
		});
		
	},
	parseVideo (url) {
		let valid = false;
		let type = false;
		let checkVideo = url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
		
		return checkVideo ? checkVideo.length : 0 ;
	},
	checkImage (value) {
		const imageRegex = /https?:\/\/.*?\.(?:png|jpg|jpeg|gif)/ig;
		let checkImage = value.match(imageRegex);
		return checkImage ? checkImage.length : 0 ;
	},
	
	checkType (value) {
		const image = this.checkImage(value);
		if (image) {
			return 'image';
		}
		let video = {};
		video = this.parseVideo(value);
		if (video) {
			return 'video';
		}
		
		return 'text';
		
	},
	renderType(obj){
		if (obj.type === 'video'){
			return (
				<ReactPlayer width="100%" height="100%" url={obj.value} controls={true} />
			)
		}
		
		if (obj.type === 'image'){
			return (
				<img className="live-content-img" src={obj.value} />
			)
		}
		
		return (
			<div className="live-content-text">{obj.value}</div>
		);
		
	},
	renderSlides(){
		return(
			<div className="live-wrapper">
				<div className={ "live-left live-content " + this.state.firstValue.type}>
					{this.renderType(this.state.firstValue)}
				</div>
				<div className={ "live-right live-content " + this.state.secondValue.type}>
					{this.renderType(this.state.secondValue)}
				</div>
			</div>
		)
	},
	readyApp(){
		return (
			<div className="live-container">
				{ this.renderSlides() }
				<div className="live-controls">
					<div className="live-controls-item prev" onClick={this.state.historyCount > 1 ? () => this.moveSlides(false) : false } style={ this.state.historyCount > 1 ? {'opacity': 1} : {'opacity': 0, 'cursor': 'default'} }></div>
					<div className={ this.state.play ? "live-controls-item pause" : "live-controls-item play" } onClick={this.playPauseActions}></div>
					<div className="live-controls-item next" onClick={this.nextSlide}></div>
				</div>
			</div>
		)
	},
  render() {
    return (
			<div className="site-wrapper">
				<div className="site-wrapper-inner">
					{ this.state.ready ? this.readyApp() : this.loaderApp() }
				</div>
			</div>
    )
  }
});

export default Live;