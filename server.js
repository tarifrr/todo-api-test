var express = require('express');
var app = express();
const PORT = 3000;

var middleware = {
	requireAuthentiction: function(req,res,next){
		console.log('private route hit');
		next();
	},
	logger: function(req, res, next){
		console.log( 'Request : ' + new Date().toString() + ' ' + req.method + ' ' + req.originalUrl);
		//console.log(new Date().toString());
		next();
	}
};

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