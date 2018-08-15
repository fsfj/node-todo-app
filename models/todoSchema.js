const { Schema } = require('mongoose');
const mongoose = require('../data/dbconnection');

var Todo = mongoose.model('Todo', new Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
}))

module.exports = Todo;