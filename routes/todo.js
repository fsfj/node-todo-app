const express = require('express');
const router = express.Router();
const Todo = require('../models/todoSchema');
const { ObjectID } = require('mongodb');

router.get('/', (req, res) => {
    res.send('todo route works!');
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.sendStatus(404).send('Invalid Id');
    }

    Todo.findById(id)
        .then(todo => {
            if(todo) {
                res.send({ todo });
            }
            res.sendStatus(404).send({ todo });
        },err => res.sendStatus(404).send(err));
});

router.patch('/', (req, res) => {
    let updateTodo = new Todo(req.body);
});

router.post('/', (req, res) => {
    //todoService.addNewTodo(req.body);

    var newTodo = new Todo({
        text: req.body.text
    });
    
    newTodo.save().then(doc => {
       res.send(doc);
    }, err => {
       return new handleError(err);
    });

});

module.exports = router;