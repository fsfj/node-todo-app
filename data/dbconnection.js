const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const uri = "mongodb://localhost:27017/TodoDB";

mongoose.connect(uri);



module.exports = mongoose;