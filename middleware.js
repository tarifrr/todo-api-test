module.exports = {
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
