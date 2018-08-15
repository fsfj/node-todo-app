const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const todoRoutes = require('./routes/todo');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use('/todos', todoRoutes);


const todo = require('./services/todo');
const user = require('./services/user');

//user.addNewUser();

//todo.deleteTodo();
//todo.addNewTodo();
// app.post('/todos', (req, res) => {
//     var response = todo.addNewTodo(req.body);

//     res.send(response);
// });

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports = {  app };