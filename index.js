//Main starting point of the application

const express = require('express');
const http = require('http');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

const cors = require('cors');


//DB setup
mongoose.connect('mongodb://127.0.0.1:27017/auth', function(err){
	if(err){console.log('Connection error'+ err);}
	else{console.log('DB Connected');}
});
//Second Phase: App Setup: Express. 
app.use(morgan('combined'));             // middleware: frame work used for logging incoming request, can be used to testing. shown in terminal

app.use(cors());                         //middleware: for cors


app.use(bodyparser.json({type: '*/*'})); // middleware: used to parse incoming request in json format, no matter what the type is
router(app);


//First Phase: Server Setup:Express app talk to outside world

const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);