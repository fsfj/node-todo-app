const { Schema } = require('mongoose');
const mongoose = require('../data/dbconnection');
const validator = require('validator');
const jwt = require('jsonwebtoken');

var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate:{
            validator: validator.isEmail,
            msg:`{VALUE} is not a valid email`
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true 
        }
    }]
});

UserSchema.methods.generateAuthToken = function() {
    var user = this;
    console.log(user);
    var access = "auth";
    var token = jwt.sign({ _id: user._id.toHexString(), access}, "abc123").toString();

    user.tokens.push({ access, token });

    return user.save().then(() => {
        return token;
    });
}

UserSchema.statics.findByToken = function(token) {
    var User = this;

    var decoded;
    try{

        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject();
    }
    return User.findOne({
         _id: decoded._id,
        'tokens.token': token,
        'tokens.access': decoded.access
    });
}
var User = mongoose.model('User', UserSchema);


module.exports = User;