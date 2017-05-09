import React from 'react'
var reactRouter = require('react-router');
var Router = reactRouter.Router;
var browserHistory = reactRouter.browserHistory;
var routes = require('../routes').default;

export default class AppRoutes extends React.Component {
	render() {
		return (
			<Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
		);
	}
}