const Authentication = require('./controllers/authentication');

const passportService = require('./services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt',{session:false});


const requireSignin = passport.authenticate('local', {session:false});
module.exports = function(app){
	app.get('/',requireAuth,function(res,req){
		res.send({ message: 'super screret code asddgf'});
	});
	app.post('/signin',requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);
}


// module.exports = function(app){
// 	app.get('/',function(req, res, next){
// 		res.send(['water','paper']);
// 	});
// }


//requireAuth is an middleware used to tell passport to authenticate a user based on jwt token
//