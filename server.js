const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// routes
const todoRoute = require('./routes/todo');
const userRoute = require('./routes/user');

// register middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', (req, res) => {
   res.send('Todos API ^_^'); 
});
app.use('/api/todos', todoRoute);
app.use('/api/users', userRoute);


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is up on port http://localhost:${port}`);
});

module.exports = {  app };