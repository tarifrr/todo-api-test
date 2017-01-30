var express = require('express');
var app = express();
var todos = [
{
	id: 1,
	description: 'Cook chicken',
	completed: false
},
{
	id: 2,
	description: 'Clean house',
	completed: false
},
{
	id: 3,
	description: 'Read book',
	completed: true
}
];


const PORT = process.env.PORT || 3000;



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

