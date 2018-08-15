const Todo = require('../models/todoSchema');

function addNewTodo(todo){
    var newTodo = new Todo({
        text: todo.text
    });
    
    newTodo.save().then(doc => {
       return doc;
    }, err => err);
}

function deleteTodo() {
    Todo.deleteMany({}).then(() =>{
        console.log('todos has been successfully deleted');
    }, err => console.log(err));
}

function updateTodo() {

}

function getTodo(id) {

}

function getTodos(){

}
module.exports = {
    addNewTodo,
    deleteTodo
}
