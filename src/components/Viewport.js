import React, { Component } from 'react';

import Board from './Board'
import BoardNavigation from './BoardNavigation'

import MobileBoard from './MobileBoard'
import MobileBoardNavigation from './MobileBoardNavigation'

var MediaQuery = require('react-responsive');

class Viewport extends Component {
	constructor(props) {
		super(props);
		
		this.state = {viewport: 0}
		
		this._handleViewportChange = this._handleViewportChange.bind(this);
	}
	
	_handleViewportChange(selected) {
		this.setState({viewport: selected});
	}
	
	render() {
		if (this.props.mobile) {
			return <div><MobileBoard tab={this.state.viewport}/><MobileBoardNavigation handler={this._handleViewportChange}/></div>;
		}
		else {
			return <div><Board tab={this.state.viewport}/><BoardNavigation handler={this._handleViewportChange}/></div>;
		}
	}
}

export default Viewport;