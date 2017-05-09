import React, {Component} from 'react';
import { Link } from 'react-router';

import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon'

import FavoriteSelected from 'material-ui/svg-icons/action/home';
import FavoriteUnselected from 'material-ui/svg-icons/action/home';

const style = {
	display: 'flex',
	flexDirection: 'column',
	marginTop: '8px',
	marginBottom: '4px'
}

class BoardCard extends Component {
	constructor(props) {
		super(props);
		
		this._handleLiked = this._handleLiked.bind(this);
		
		this.state = {
			liked: false
		};
	}
	
	_handleLiked() {
		this.setState({liked: !this.state.liked});
	}
	
	render() {
		var editLink = '/card/' + this.props.data._id;
		
		var favoriteIcon;
		if (this.state.liked) {
			favoriteIcon = <FontIcon className="material-icons">favorite</FontIcon>;
		}
		else {
			favoriteIcon = <FontIcon className="material-icons">favorite_border</FontIcon>;
		}
		
		return (
		  	<Card style={style}>
		  	  <Link to={editLink} style={{ textDecoration: 'none' }}>
				<CardTitle title={this.props.data.title} subtitle={this.props.data.subtitle} />
				<CardText expandable={false}>
					{this.props.data.content}
				</CardText>
			  </Link>
				<CardActions>
					<IconButton onTouchTap={this._handleLiked}>
						{favoriteIcon}
					</IconButton>
				</CardActions>
			</Card>
		);
	}
}

export default BoardCard;