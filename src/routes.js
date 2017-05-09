'use strict';

import React from 'react';
var reactRouter = require('react-router');
var Route = reactRouter.Route;
var IndexRoute = reactRouter.IndexRoute;

import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import CardEditor from './components/CardEditor';
import CardViewer from './components/CardViewer';
import NotFoundPage from './components/NotFoundPage';


const routes = (
	<Route path='/' component={Layout}>
		<IndexRoute component={IndexPage}/>
		<Route path="/card/:id" component={CardViewer} />
		<Route path="/edit/:id" component={CardEditor} />
		<Route path="*" component={NotFoundPage}/>
	</Route>
);

export default routes;