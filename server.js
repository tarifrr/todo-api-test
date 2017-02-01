var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var todos = [];
var todoNextId= 1;

const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());

app.get('/',function(req,res){
	res.send('Todo API Root');
});

//GET /todos
app.get('/todos',function(req,res){
	res.json(todos);
});

//GET /todos/:id

app.get('/todos/:id',function(req,res){

	var todoId = parseInt(req.params.id,10);
	var todoItem;

	todos.forEach(function(todo){
		if(todo.id === todoId)
			todoItem = todo;
	});

	if(todoItem)
		res.send(todoItem);
	else
		res.status(404).send();	


});

app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT + ' !')
});

// POST /todos
app.post('/todos', function (req, res){

	var body = req.body;
	body.id = todoNextId++;
	todos.push(body);
	res.json(body);
});

