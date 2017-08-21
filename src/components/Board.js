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
	}
	
	render() {
		if (this.props.cards.length == 0) {		//Return a spinner until init
			return(<div style={style}><Spinner /></div>);	
		}
		
		var cards = [];
		for (var x = 0; x < this.props.cards.length; x++) {
			if (this.props.tab == 2) { //If the current tab is favorites
				cards.push(<Card user={this.props.user} data={ this.props.cards[x]} favorited={ true } />);
			}
			else {
				cards.push(<Card user={this.props.user} data={ this.props.cards[x] } />);
			}	
		}

		if (cards.length == 0){
			return <div style={style}>There are not any cards here now, try again later.</div>
		}
		else {	
			return (
				<div style={style}>{cards}{cards}{cards}{cards}{cards}{cards}{cards}{cards}</div>
			);
		}
		
	}
}

export default Board;