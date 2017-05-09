import React from 'react';
import { Link } from 'react-router';

export default class Card extends React.Component {
	constructor(props) {
		super(props);
		
	}
	
	render() {
		var editLink = '/card/' + this.props.data._id;
		
		return (
			<Link to={editLink}>
				<div className='card'>
					<span>{this.props.message}</span>
				</div>
			</Link>
		)
	}
}