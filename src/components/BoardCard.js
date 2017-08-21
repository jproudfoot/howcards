import React, {Component} from 'react';
import { Link } from 'react-router';

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
	display: 'flex',
	flexDirection: 'column',
	marginTop: '8px',
	marginBottom: '4px'
}

const buttonStyle = {
	float: 'right'
}

class BoardCard extends Component {
	constructor(props) {
		super(props);
		
		this._handleLiked = this._handleLiked.bind(this);
		
		this.state = {
			liked: this.props.favorited,
			owned: this.props.owned
		};
	}
	
	_handleLiked() {
		if (this.state.liked) {
			socket.emit('server:unfavoriteCard', {card: this.props.data._id, user: this.props.user.id})
		}
		else {
			socket.emit('server:favoriteCard', {card: this.props.data._id, user: this.props.user.id})
		}
		this.setState({liked: !this.state.liked});
	}
	
	render() {
		var editLink = '/card/' + this.props.data._id;
		
		var favoriteIcon;
		if (this.state.liked) {
			favoriteIcon = <FavoriteSelected />;
		}
		else {
			favoriteIcon = <FavoriteUnselected />;
		}
		
		return (
		  	<Card style={style}>
		  	  <Link to={editLink} style={{ textDecoration: 'none' }}>
				<CardTitle title={this.props.data.title} subtitle={this.props.data.subtitle} />
				<CardText expandable={false}>
					{this.props.data.content[0].content}
				</CardText>
			  </Link>
				<CardActions style={buttonStyle}>
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
		);
	}
}

export default BoardCard;