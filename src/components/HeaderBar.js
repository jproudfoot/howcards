import React, { Component } from 'react';
import { Link } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';

import FlatButton from 'material-ui/FlatButton'

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import NewCardIcon from 'material-ui/svg-icons/av/queue';
import NewDeckIcon from 'material-ui/svg-icons/content/add-box';

class HeaderBar extends Component {
	constructor(props) {
		super(props);
		
		this._handleRefresh = this._handleRefresh.bind(this);
		this._handleHelp = this._handleHelp.bind(this);
		this._handleLogout = this._handleLogout.bind(this);
	}
	
	_handleRefresh() {
		window.location.reload();
	}
	
	_handleHelp() {
		window.location.assign('/help');
	}
	
	_handleLogout() {
		window.location.assign('/logout');
	}
	
	render() {
		var headerActions;
		if (this.props.mobile) {
			headerActions = <IconMenu 
								iconButtonElement={<IconButton><MoreVertIcon color={'white'}/></IconButton>} 
								anchorOrigin={{horizontal: 'right', vertical: 'top'}} 
								targetOrigin={{horizontal: 'right', vertical: 'top'}}
							>
      			  				<MenuItem primaryText="Refresh" onTouchTap={this._handleRefresh}/>
     			   				<MenuItem primaryText="Help" onTouchTap={this._handleHelp}/>
      			  				<MenuItem primaryText="Sign out" onTouchTap={this._handleLogout}/>
							</IconMenu>;
		}
		else {
				headerActions = <div>
				<IconButton tooltip='Create Deck'><NewDeckIcon color={'white'}/></IconButton>
				<IconButton tooltip='Create Card'><NewCardIcon color={'white'}/></IconButton>			
				<IconMenu 
					iconButtonElement={<IconButton><MoreVertIcon color={'white'}/></IconButton>} 
					anchorOrigin={{horizontal: 'right', vertical: 'top'}} 
					targetOrigin={{horizontal: 'right', vertical: 'top'}}
				>
	  				<MenuItem primaryText="Refresh" onTouchTap={this._handleRefresh}/>
	   				<MenuItem primaryText="Help" onTouchTap={this._handleHelp}/>
	  				<MenuItem primaryText="Sign out" onTouchTap={this._handleLogout}/>
				</IconMenu></div>;
		}
		
		if (this.props.user.id != '') {
			return (
				<MuiThemeProvider>
					<AppBar 
						title={<Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Pingry Howcards</Link>} 
						showMenuIconButton={false}
						iconElementRight={headerActions}
					/>
			
				</MuiThemeProvider>
			);
		}
		else {
			return (
				<MuiThemeProvider>
			
					<AppBar 
						title={<Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Pingry Howcards</Link>} 
						showMenuIconButton={false}
						iconElementRight={<FlatButton label='Login' href='/login' />}
					/>
			
				</MuiThemeProvider>
			);
		}
	}
}

export default HeaderBar;