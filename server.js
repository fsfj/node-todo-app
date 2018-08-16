const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// routes
const todoRoute = require('./routes/todo');
const userRoute = require('./routes/user');

// register middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use('/todos', todoRoute);
app.use('/user', userRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

var x = 0;
function getData() {
    x = x + 1;
    return x;
}
//console.log(getData());
if(getData() > 0 || getData() < 10){
    console.log(x);
}

module.exports = {  app };