const mongoose = require('../data/dbconnection');
const userSchema = require('../models/userSchema');

var User = mongoose.model('User', userSchema);

addNewUser = () => {
    var user = new User({ email: 'ffsj03@gmail.com'});

    user.save().then(() => {
        console.log('user has been added');
    }, err => console.log(err));
}

module.exports = {
    addNewUser
}