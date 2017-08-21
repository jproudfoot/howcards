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

var session = require('client-sessions');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

import routes from './routes';
import NotFoundPage from './components/NotFoundPage';

// initialize the server and configure support for ejs template
const app = new Express();
const server = new Server(app);

app.set('views', path.join(__dirname, 'static'));
app.set('view engine', 'ejs');

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, '/static')));

//mongoose stuff
mongoose.connect('mongodb://192.168.86.236/howcards');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


//Schema for Mongoose and MongoDB
var cardSchema = mongoose.Schema({
	author: String,
	title: String,
	subtitle: String,
	content: Array,
	owner: String,
	recommended: Boolean,
	public: Boolean
});
var Card = mongoose.model('Card', cardSchema);


var userSchema = mongoose.Schema({
	id: String,
	firstName: String,
	lastName: String,
	isPingry: Boolean,
	cards: Array,
	favorites: Array
});
var User = mongoose.model('User', userSchema);

//session initialization
app.use(session({
	cookieName: 'session',
	secret: 'I drink and I know things',
	duration: 1800000,
	activeDuration: 30000
}));

// define Passport middleware
app.use(passport.initialize());
app.use(passport.session());
 
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
	User.findOne({ id: id }, function(err, user) {
		if (err) {
			console.log('error');
			return done(err);
		}
		//console.log(user);
		return done(err, user);
	});
});

//Configure Passport Authentication
passport.use(new GoogleStrategy({
	clientID: '216459576380-6sgiuqf38vmj604mnra5md24c7b22vpb.apps.googleusercontent.com',
	clientSecret: 'BFsjbLulCrsKGoGS9W6uVWlH',
	callbackURL: 'http://localhost:3000/login/callback' 
},
function(accessToken, refreshToken, profile, done) {
	User.findOne({ id: profile.id }, function(err, user) {
		if (err) {
			console.log('error');
			return done(err);
		}
		if (!user) { //Create user entry if new user
			var newUser = new User({
				id: profile.id,
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				isPingry: (profile.domain == 'pingry.org')
			});
			newUser.save(function(err, newUser) {
				if (err) console.log(err);
				db.close();
			});
			return done(err, newUser);
		} else { //return user if existing
			return done(err, user);
		}
	});
}
));

/*var card = new Card({ author: 'Kevin', title: 'Using Bradford Dissolvable', subtitle: 'What is a bradford?', content: [{title: "Step 1", content: "Don't bother connecting to wifi, the internet is dead anyway."}, {title: "step 2", content: "Yeah, the internet is lame"}], owner: '108005168715097953515', recommended: true, public: true});
card.save(function (err, card) {
	if (err) return console.error(err);
});*/

//Socket.IO data management
var io = require('socket.io')(server);
io.on('connection', function(socket) {
	console.log('User connected');
	
	//Initialize Client
	//WRITE CODE TO HANDLE DIFFERENT BOARDS
	socket.on('server:boardInitialization', function(data) {
		
		if (data.tab == 0) { //Basic Recommended board
			Card.find({ public: /true/, recommended: /true/ }).sort('-timestamp').exec(function(err, cards) {
				socket.emit('client:boardInitialization', cards);
				console.log('Board Initialized');
			});
		}
		else if (data.tab == 1) { //Public Board
			Card.find({ public: /true/ }).sort('-timestamp').exec(function(err, cards) {
				socket.emit('client:boardInitialization', cards);
				console.log('Board Initialized');
			});
		}
		else if (data.tab == 2) { //Favorites Board
			
			User.findOne({ id: data.user.id}).exec(function(err, user) {
				if (err) {return next(err); }
				
				var cards = [];
				
				Card.find({ '_id': { $in: user.favorites } }, function(err, cards) {
					socket.emit('client:boardInitialization', cards);
					console.log('Favorites Initialized');
				});
			});	
		}
		
		else if (data.tab == 4) { //Personal Board
			
			User.findOne({ id: data.user.id}).exec(function(err, user) {
				if (err) {return next(err); }
				
				var cards = [];
				
				Card.find({ '_id': { $in: user.cards } }, function(err, cards) {
					socket.emit('client:boardInitialization', cards);
					console.log('Personal Initialized');
				});
			});	
		}
		
		else {
			socket.emit('client:boardInitialization', []);
		}
	});
	
	//Serve CardViewer Client
	socket.on('server:cardViewerInitialization', function(data) {
		Card.findOne({ _id: data }).exec(function(err, card) {
			socket.emit('client:cardViewerInitialization', card);
			console.log('Card Viewer Initialized');
		});
	});
	
	socket.on('server:favoriteCard', function(data) {
		User.findOne({ id: data.user }).exec(function(err, user) {
			if (err) {return next(err); }
			
			var favorited = false;
			for (var x = 0; x < user.favorites.length; x++) {
				if (user.favorites[x] == data.card) {
					favorited = true;
					break;
				}
			}
			
			if (!favorited){
				user.favorites.push(data.card);
				user.save(function(err) {
					if(err) {return next(err); }
				});
			}
			
			console.log(user.favorites);
			console.log('Card Favorited');
		});
	});
	socket.on('server:unfavoriteCard', function(data) {
		User.findOne({ id: data.user }).exec(function(err, user) {
			if (err) {return next(err); }
			
			for (var x = 0; x < user.favorites.length; x++) {
				if (user.favorites[x] == data.card) {
					user.favorites.splice(x, 1);
				}
			}
			user.save(function(err) {
				if(err) {return next(err); }
			});
			
			console.log(user.favorites);
			console.log('Card UnFavorited');
		});
	});
	
	socket.on('server:getUser', function(id) {
		User.findOne({ id: id }).exec(function(err, user) {
			if (err) {return next(err); }
			socket.emit('client:getUser', user);
		});
	});
	
	socket.on('server:cookie', function(data) {
		console.log(data);
	})
});

//Map authentication
app.get('/login', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email'] }));
app.get('/login/callback', 
	passport.authenticate('google', { failureRedirect: '/login' }),
	function(req, res) {
		req.session.user = req.user;
		res.redirect('/');
	}
);
app.get('/logout', function(req, res) {
	req.session.user = '';
	res.redirect('/');
});


app.get('/auth/user', function(req, res) {
	if (req.session.user != undefined) {
		res.send( req.session.user.id );
	}
	else {
		res.send( '' );
	}
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