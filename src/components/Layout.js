import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Layout extends React.Component {
	constructor(props) {
		super(props);
		
		this.state= {user: {id: ''}}
		
		this._addUser = this._addUser.bind(this);
		this._fetchUser = this._fetchUser.bind(this);
		this._setUser = this._setUser.bind(this);
	}
	
	componentDidMount() {
		this._fetchUser(this._addUser);
		
		socket.on('client:getUser', this._setUser);
	}
	
	_fetchUser(callback) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() { 
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				callback(xmlHttp.responseText);
			}
		}
		xmlHttp.open("GET", '/auth/user', true);
		xmlHttp.send(null);
	}
	
	_addUser(userId) {
		socket.emit('server:getUser', userId);
	}
	
	_setUser(user) {
		this.setState({user: user});
	}
	
	render() {
	
		return (
			<div className="app-container">
				<div className="app-content">
					<MuiThemeProvider>
						{React.cloneElement(this.props.children, { user: this.state.user })}
					</MuiThemeProvider>
				</div>
			</div>
		);
	}
}