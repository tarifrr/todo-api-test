var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('underscore');
var db = require('./db.js');

var todos = [];
var todoNextId= 1;
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());

app.get('/',function(req,res){
	res.send('Todo API Root');
});

//GET /todos?completed=value&q=
app.get('/todos',function(req,res){
	

	var query = req.query;
	var where = {};

	if(query.hasOwnProperty('completed') && query.completed.trim() === 'true')
		where.completed = true;
	else if(query.hasOwnProperty('completed') && query.completed.trim() === 'false')
		where.completed = false;

	if(query.hasOwnProperty('q') && query.q.trim().length > 0)	
		where.description = {$like: '%' + query.q.trim() + '%'};

	console.log(where);

	db.todo.findAll({where: where}).then(function(todos){
		if(todos)
			return res.json(todos);
		else
			return res.status(404).send();
	},
	function(e){
		return res.status(500).send();
	});

	// if(queryParams.hasOwnProperty('completed') && queryParams.completed.trim() === 'true')	
	// 	filteredTodos = _.where(filteredTodos,{completed: true});
	// else if(queryParams.hasOwnProperty('completed') && queryParams.completed.trim() === 'false')
	// 	filteredTodos = _.where(filteredTodos,{completed: false});

	// if(queryParams.hasOwnProperty('q') && queryParams.q.trim().length > 0)	
	// 	filteredTodos = _.filter(filteredTodos, function(todos){
	// 		return todos.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
	// 	});
	// res.json(filteredTodos);
});

//GET /todos/:id

app.get('/todos/:id',function(req,res){

	var todoId = parseInt(req.params.id,10);
	
	db.todo.findOne({
		where:{
			id: todoId
		}
	}).then(function(todo){
		if(todo)
			return res.json(todo.toJSON())
		else
			return res.status(404).json();
	}).catch(function(e){
		return res.status(500).json(e);
	});


	// var todoItem = _.findWhere(todos,{id: todoId});


	// if(todoItem)
	// 	res.send(todoItem);
	// else
	// 	res.status(404).send();	


});


// POST /todos
app.post('/todos', function (req, res){

	var body = _.pick(req.body,'description','completed');
	
	db.todo.create(body).then(function(todo){
		return res.json(todo.toJSON());
	}).catch(function(e){
		res.status(400).json(e);
	});


	// if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0)
	// 	return res.status(400).send();
	
	// body.description = body.description.trim();
	// body.id = todoNextId++;
	// todos.push(body);
	// res.json(body);	
});

// DELETE /todos/:id

app.delete('/todos/:id', function (req, res){

	var todoId = parseInt(req.params.id,10);
	var matchedToDo = _.findWhere(todos,{id:todoId});

	if(!matchedToDo)
		return res.status(404).json({"error":"no todo found with provided id"});
	else {
		
		todos = _.without(todos,matchedToDo);
		return res.json(matchedToDo);
	}

});

//PUT /todos/:id

app.put('/todos/:id', function (req,res){
	var body = _.pick(req.body,'description','completed');
	var validAttributes = {};

	var todoId = parseInt(req.params.id,10);
	var matchedToDo = _.findWhere(todos,{id:todoId});

	if(!matchedToDo)
		return res.status(404).json({"error":"no todo found with provided id"});


	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttributes.completed = body.completed; 
	}else if (body.hasOwnProperty('completed')) {
		return res.status(400).send();
	}

	if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0){
		validAttributes.description = body.description.trim(); 
	}else if (body.hasOwnProperty('description')) {
		return res.status(400).send();
	}	

	_.extend(matchedToDo,validAttributes);
	res.json(matchedToDo);
});

db.sequelize.sync()
	.then(function(){
		app.listen(PORT, function(){
			console.log('Express listening on port ' + PORT + ' !')
		});		
	});


