const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');


function tokenForUser(user){
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next){
	const email = req.body.email;
	const password = req.body.password;

	if(!email || !password){
		return res.status(422).send({error:'You must provide email and password'});
	}

	//see if a user with the given email exists
	User.findOne({email:email},function(error, existingUser){
		if(error){return next(error);}

		//if a user with email does exists , return error
		if(existingUser){
			return res.status(422).send({error:'Email is in use'});
		}

		//if a user does not exist, create and save user record
		const user = new User({    //create user
			email:email,
			password:password
		});

		user.save(function(err){
			if(err){return next(err);}

		//respond to request indicating the user was created	
		res.json({token: tokenForUser(user)});

		});

		
		
	});
}

exports.signin = function(req, res, next){
	//user alreacy hav their email and paword. we just need to give them a token
	
	res.send({ token: tokenForUser(req.user) });
}



// exports.signup = function(req, res, next){
// 	res.send({success:'true'});

// }



//req.body: anything contained within a request(post/get)
//422 bad data...cannnot be processed as eamil is alreday registerd