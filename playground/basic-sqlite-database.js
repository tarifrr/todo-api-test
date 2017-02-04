var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo',{
	
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1,250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
})


sequelize.sync({force: false})
.then(function(){
	console.log('Everything is synced');
	Todo.findOne({
		where:{
			id: 3
		}
	}).then(function(todo){
		console.log(todo.toJSON());
	}).catch(function(error){
		console.log('Could not find todo item');
	});
	
	// Todo.create({
	// 	description: "Walk the dog",
	// 	completed: false
	// }).then(function(todo){
	// 	Todo.create({
	// 		description: 'Have breakfast'
	// 	});
	// }).then(function(){
	// 	//return Todo.findById(1);
	// 	return Todo.findAll({
	// 		where: {
	// 			description: {
	// 				like: '%eak%'
	// 			}
	// 		}
	// 	});
	// }).then(function(todos){
	// 	if(todos){
	// 		todos.forEach(function(todo){
	// 			console.log(todo.toJSON());
	// 		});
				
	// 	} else{
	// 		console.log('No todo found');
	// 	}	
	// }).catch(function(error){
	// 	console.log(error);
	// });	
});