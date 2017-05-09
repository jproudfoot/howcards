import React from 'react';

import Card from './Card'

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		
		this._initialize = this._initialize.bind(this);
		
		this.state = { cards: [] };
	}
	
	componentDidMount() {
		//Initialize Board
		socket.emit('server:boardInitialization', 'initialize');
		socket.on('client:boardInitialization', this._initialize);
	}
	
	_initialize(data) {
		this.setState({ cards: data, active: 'true' });
	}
	
	render() {
		var cards = [];
		for (var x = 0; x < this.state.cards.length; x++) {
			cards.push(<Card data={ this.state.cards[x] } message={ this.state.cards[x].title } />);
		}
		if (cards.length > 0) {
			return (
				<div>{cards}</div>
			)
		}
		else return(<div>BOARD</div>);
		
	}
}