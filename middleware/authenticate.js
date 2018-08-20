const User = require('../models/userSchema');
const _ = require('lodash');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then(user => {
        if(!user){
            return Promise.reject();
        }
        user = _.pick(user, ['email', 'password']);
        //res.send(user);
        req.user = user;
        req.token = token;
        next();
    }).catch(err => {
        res.status(401).send(err);
    });
}

module.exports = {authenticate};
