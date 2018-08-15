const express = require('express');
const router = express.Router();
const todoService = require('../services/todo');
const Todo = require('../models/todoSchema');

router.get('/', (req, res) => {
    
});

router.post('/', (req, res) => {
    //todoService.addNewTodo(req.body);

    var newTodo = new Todo({
        text: req.body.text
    });
    
    newTodo.save().then(doc => {
       res.send(doc);
    }, err => {
       res.status(400).send(err);
    });

});

module.exports = router;