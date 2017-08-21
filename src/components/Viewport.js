import React, { Component } from 'react';

import Board from './Board'
import BoardNavigation from './BoardNavigation'

import MobileBoard from './MobileBoard'
import MobileBoardNavigation from './MobileBoardNavigation'

import ActionButton from './ActionButton'

class Viewport extends Component {
	constructor(props) {
		super(props);
		
		this.state = {viewport: 0, cards: []}
		
		this._handleViewportChange = this._handleViewportChange.bind(this);
		this._initialize = this._initialize.bind(this);
	}
	
	componentDidMount() {
		//Initialize Board
		socket.emit('server:boardInitialization', {tab: this.state.viewport, user: this.props.user});
		socket.on('client:boardInitialization', this._initialize);
	}
	
	_initialize(data) {
		this.setState({ cards: data });
	}
	
	_handleViewportChange(selected) {
		this.setState({viewport: selected});
		socket.emit('server:boardInitialization', {tab: selected, user: this.props.user});
	}
	
	render() {
		var loggedIn;
		if (this.props.user.id != '') {
			loggedIn = true;
		}
		else {
			loggedIn = false;
		}
		
		if (this.props.mobile) {
			return (<div>
						<MobileBoard user={this.props.user} cards={this.state.cards} tab={this.state.viewport}/>
						<MobileBoardNavigation loggedIn={loggedIn} handler={this._handleViewportChange}/>
					</div>);
		}
		else {
			
			return (<div>
						<Board user={this.props.user} cards={this.state.cards} tab={this.state.viewport}/>
						
						<ActionButton loggedIn={loggedIn} />
						
						<BoardNavigation loggedIn={loggedIn} handler={this._handleViewportChange}/>
					</div>);
		}
	}
}

export default Viewport;