import path from 'path';
var Server = require('http').Server;
import Express from 'express';
import React from 'react';
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var renderToString = require('react-dom/server').renderToString;
var reactRouter = require('react-router');
var match = reactRouter.match;
var RouterContext = reactRouter.RouterContext;

import routes from './routes';
import NotFoundPage from './components/NotFoundPage';

// initialize the server and configure support for ejs template
const app = new Express();
const server = new Server(app);

app.set('views', path.join(__dirname, 'static'));
app.set('view engine', 'ejs');

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, '/static')));

//Schema for Mongoose and MongoDB
var cardSchema = mongoose.Schema({
	author: String,
	title: String,
	subtitle: String,
	content: String,
	tags: Array,
	lastEdited: Date,
	public: Boolean
});
var Card = mongoose.model('Card', cardSchema)

/*mongoose.connect('mongodb://192.168.86.145/howcards');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var card = new Card({ author: 'Jack', title: 'Using the Pingry Howcards', subtitle: 'Changing how the World Changes', content: "", public: true});
card.save(function (err, card) {
	if (err) return console.error(err);
	db.close();
});*/

//Socket.IO data management
var io = require('socket.io')(server);
io.on('connection', function(socket) {
	console.log('User connected');
	
	//Initialize Client
	//WRITE CODE TO HANDLE DIFFERENT BOARDS
	socket.on('server:boardInitialization', function(tab) {
		console.log(tab);
		if (tab == 0) {
			mongoose.connect('mongodb://192.168.86.145/howcards');
			var db = mongoose.connection;
			db.on('error', console.error.bind(console, 'connection error:'));
			Card.find({ public: /true/ }).sort('-timestamp').exec(function(err, cards) {
				socket.emit('client:boardInitialization', cards);
				console.log('Main Index Initialized');
			});
			db.close();
		}
		else {
			socket.emit('client:boardInitialization', []);
		}
	});
	
	//Serve CardViewer Client
	socket.on('server:cardViewerInitialization', function(data) {
		console.log(data)
		mongoose.connect('mongodb://192.168.86.145/howcards');
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		Card.findOne({ _id: data }).sort('-timestamp').exec(function(err, card) {
			socket.emit('client:cardViewerInitialization', card);
			console.log('Card Viewer Initialized');
		});
		db.close();
	});
});

//Map server routes to React routes
app.get('*', (req, res) => {
		match(
			{ routes, location: req.url },
			(err, redirectLocation, renderProps) => {
				if (err) {
					return res.status(500).send(err.message);
				}
				
				if (redirectLocation) {
					return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
				}
				
				let markup;
				if (renderProps) {
					markup = renderToString(<RouterContext {...renderProps}/>);
				}
				else {
					markup = renderToString(<NotFoundPage/>);
					res.status(404);
				}
				
				return res.render('index', { markup });
			}
		);
});


//Node.js server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
	if (err) {
		return console.error(err);
	}
	console.info('Server running on http://localhost:' + port);
});