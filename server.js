var express = require('express');
var app = express();
var middleware = require('./middleware.js');
const PORT = process.ENV.PORT || 3000;




app.use(middleware.logger);
//app.use(middleware.requireAuthentiction);

// app.get('/', function(req, res){
// 	res.send('Hello Express!');
// });

app.get('/about', middleware.requireAuthentiction ,function(req, res){
	res.send('About Us!!');
});

app.use(express.static(__dirname + '/public'));

app.listen(3000 ,function(){
	console.log('Server started at port : ' + PORT);
});