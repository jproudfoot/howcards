import React, { Component } from 'react';

import Spinner from './Spinner';
import Card from './BoardCard'

const style = {
	height: 'calc(100vh - 120px)',
	paddingLeft: 'calc(10vw + 20px)',
	paddingRight: 'calc(10vw + 20px)',
	
	overflowY: 'scroll',
	
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 2fr)',
	gridTemplateRows: 'auto',
	gridGap: '20px'
}

class Board extends Component {
	constructor(props) {
		super(props);
		
		this._initialize = this._initialize.bind(this);
		
		this.state = {cards: []}
	}
	
	componentDidMount() {
		//Initialize Board
		socket.emit('server:boardInitialization', this.props.tab);
		socket.on('client:boardInitialization', this._initialize);
	}
	
	componentWillRecieveProps(nextProps) {
		//Initialize Board
		socket.emit('server:boardInitialization', nextProps.tab);
		socket.on('client:boardInitialization', this._initialize);
	}
	
	_initialize(data) {
		this.setState({ cards: data });
	}
	
	render() {
		if (this.state.cards.length == 0) {		//Return a spinner until init
			return(<div style={style}><Spinner /></div>);	
		}
		
		var cards = [];
		for (var x = 0; x < this.state.cards.length; x++) {
			cards.push(<Card data={ this.state.cards[x] } />);
		}

		if (cards.length == 0){
			return <div style={style}>There are not any cards here now, try again later.</div>
		}
		else {	
			return (
				<div style={style}>{cards}{cards}{cards}{cards}</div>
			);
		}
		
	}
}

export default Board;