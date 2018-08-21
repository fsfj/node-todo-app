const express = require('express');
const router = express.Router();
const Todo = require('../models/todoSchema');
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const { authenticate } = require('../middleware/authenticate');

router.get('/', (req, res) => {
    // res.send('todo route works!');

    // res
    Todo.find({ completed: false }).then(todos => {
        res.json(todos);
    }).catch(err => res.status(400).send());
});

router.get('/done', (req, res) => {
    Todo.find({ completed: true }).then(todos => {
        res.json(todos);
    }).catch(err => res.status(400).send());
})

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

router.post('/', (req, res) => {
    //todoService.addNewTodo(req.body);

    var newTodo = new Todo({
        text: req.body.text
    });
    
    newTodo.save().then(doc => {
       res.send(doc);
    }, err => {
       return res.sendStatus(400).send(err);
    });

});

router.patch('/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, [ 'text', 'completed'])

    if(!ObjectID.isValid(id)){
        return res.status(400).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true}).then(todo => {
        if(!todo) {
            return res.status(404).send();
        }
        res.json({ todo });
    }).catch(err => res.status(400).send());
});

router.delete('/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.sendStatus(400).send();
    }

    Todo.deleteOne({ _id: id }).then(todo => {
        res.send(todo);
    }).catch(err => res.sendStatus(400).send());
});

module.exports = router;