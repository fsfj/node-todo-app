const express = require('express');
const router = express.Router();
const _ = require('lodash');
const User = require('../models/userSchema');
const {authenticate} = require('../middleware/authenticate');

router.get('/', (req, res) => {
    res.send('Users API');
});

// var authenticate = (req, res, next) => {
//     var token = req.header('x-auth');

//     User.findByToken(token).then(user => {
//         if(!user){
//             return Promise.reject();
//         }
//         //user = _.pick(user, ['email', 'password']);
//         //res.send(user);
//         req.user = user;
//         req.token = token;
//     }).catch(err => {
//         res.status(401).send(err);
//     });
// }

router.get('/me',authenticate, (req, res) => {
    res.send(req.user);
});
router.post('/', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    var newUser = new User(body);
    
    newUser.save().then(() => {
    //    res.send(doc);
        return newUser.generateAuthToken();
    }).then(token => {
        newUser = _.pick(newUser, ['email', '_id']);
        res.header('x-auth', token).send(newUser);
    }).catch(err => res.status(400).send(err));

})

module.exports = router;