import React from 'react';
var reactRouter = require('react-router')
var Link = reactRouter.Link;

export default class NotFoundPage extends React.Component {
	render () {
		return (
			<div className="not-found">
				<h1>404</h1>
				<h2>Page not found!</h2>
				<p>
					<Link to="/">Go back to the main page</Link>
				</p>
			</div>
		);
	}
}