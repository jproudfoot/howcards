import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HeaderBar from './HeaderBar';

export default class CardEditor extends React.Component {
	constructor(props) {
		super(props);
	
		this._initialize = this._initialize.bind(this);
	
		this.state = { 
			card: {
				title:'test'
			} 
		};
	}
	
	componentDidMount() {
		//Initialize Card Data
		socket.emit('server:cardViewerInitialization', this.props.params.id);
		socket.on('client:cardViewerInitialization', this._initialize);
		
	}
	
	_initialize(data) {
		this.setState({ card: data });
	}
	
	render () {
		
		return (
			<MuiThemeProvider>
				<div>
					<HeaderBar />
					
					<div>{this.state.card.title}</div>
			
					<div>{this.state.card.content}</div>
				
					<div>Written by: {this.state.card.author}</div>
				</div>
			</MuiThemeProvider>
		)
	}
}