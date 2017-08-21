import React, { Component } from 'react';

import HeaderBar from './HeaderBar';

import Spinner from './Spinner'

import CardStepper from './CardStepper'

import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon'

import FavoriteSelected from 'material-ui/svg-icons/action/favorite';
import FavoriteUnselected from 'material-ui/svg-icons/action/favorite-border';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const style = {
	spinnerStyle: {
		height: 'calc(100vh - 120px)',
		paddingLeft: 'calc(10vw + 20px)',
		paddingRight: 'calc(10vw + 20px)',
	
		overflowY: 'scroll',
	
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 2fr)',
		gridTemplateRows: 'auto',
		gridGap: '20px'
	},
	paperStyle: {
		height: '50vh',
		width: 'calc(80vw - 40px)',
		
		margin: 20,
		marginLeft: 'calc(10vw + 20px)',
		marginTop: '60px',
		
		display: 'inline-block'
	},
	buttonStyle: {
		float: 'right'
	}
};	

export default class CardViewer extends Component {
	constructor(props) {
		super(props);
	
		this._initialize = this._initialize.bind(this);
		this._handleLiked = this._handleLiked.bind(this);
		this._newDeck = this._newDeck.bind(this);
		this._addToDeck = this._addToDeck.bind(this);
		
		this.state = {card: '', liked: false}
	}
	
	componentDidMount() {
		//Initialize Card Data
		socket.emit('server:cardViewerInitialization', this.props.params.id);
		socket.on('client:cardViewerInitialization', this._initialize);
		
	}
	
	_initialize(data) {
		this.setState({ card: data });
	}
	
	_handleLiked() {
		this.setState({liked: !this.state.liked});
	}
	
	_newDeck() {
		
	}
	
	_addToDeck() {
		
	}
	
	render () {
		if (this.state.card == '') {
			return(<div><HeaderBar user={this.props.user}/><div style={style.spinnerStyle}><Spinner /></div></div>);	
		}
		else {
			var favoriteIcon;
			if (this.state.liked) {
				favoriteIcon = <FavoriteSelected/>;
			}
			else {
				favoriteIcon = <FavoriteUnselected/>;
			}
			
			return (
				<div>
					<HeaderBar user={this.props.user}/>
				
					<Card style={style.paperStyle}>
						<CardTitle title={this.state.card.title} subtitle={this.state.card.subtitle} />
				
						<CardText expandable={false}>
							<CardStepper data={ this.state.card.content} />
						</CardText>
							
						<CardActions style={style.buttonStyle}>
							<IconMenu 
								iconButtonElement={<IconButton><MoreVertIcon/></IconButton>} 
								anchorOrigin={{horizontal: 'right', vertical: 'top'}} 
								targetOrigin={{horizontal: 'right', vertical: 'top'}}
							>
  								<MenuItem primaryText="Add To New Deck" onTouchTap={this._newDeck}/>
   								<MenuItem 
									primaryText="Add To Deck"
									rightIcon={<ArrowDropRight />}
									menuItems={[
										<MenuItem primaryText="Deck 1" onTouchTap={this._addToDeck} />,
										<MenuItem primaryText="Deck 2" onTouchTap={this._addToDeck} />
									]}
								/>
							</IconMenu>
								
							<IconButton onTouchTap={this._handleLiked}>
								{favoriteIcon}
							</IconButton>
						</CardActions>
					</Card>
				</div>
			);
		}
	}
}