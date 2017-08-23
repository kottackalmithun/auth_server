//passport used to check if user is logged in to access some files/pages. i.e authenticating a user
// passport can use two strategy for authentication: 1st using jwt token; 2nd using username password
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//setup options for JWt Strategy 2
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),     // check comment A
	secretOrKey:config.secret
};



//create JWt Strategy 1
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
	//see if user id in the payload exists in our db
	//if yes, call 'done' with that 
	//else, call 'done' without a user object
	User.findById(payload.sub, function(err,user){
		if(err){return done(err, false);}
		if(user){
			done(null, user);
		}else{
			done(null, false);
		}
	});

});





//create local strategy 4
const localOptions = {usernameField:'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
	// verify this email and password, call done with user 
	//if it is correct email and pass
	// otherwise call done with false
	User.findOne({email:email}, function(err,user){
		if(err){return done(err);}
		if(!user){return  done(null, false);}

		//compare password - is 'password' equal to user.password
		// from user.js
		user.comparePassword(password, function(err, isMatch){
			if(err) {return done(err);}
			if(!isMatch){return done(null, false);}
			return done(null, user);
		});
	});
});



//Tell passport to use this strategy 3

passport.use(jwtLogin);
passport.use(localLogin);

//comments
//payload is decoded jwt token (userid and timestamp) from authenctication.js page
//done  is callback

//A : it checks in header for a variable named authorization conataining the token. can be used in postman in header tab 


// 4 localOptions tells local strategy where to look into request for email 
