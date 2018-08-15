const { Schema } = require('mongoose');

module.exports = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})