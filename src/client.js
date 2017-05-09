import React from 'react';
import ReactDOM from 'react-dom';
var browserHistory = require('react-router').browserHistory;

import AppRoutes from './components/AppRoutes';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
	<AppRoutes history={browserHistory} />, document.getElementById('root')
);