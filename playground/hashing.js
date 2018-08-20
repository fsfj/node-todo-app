const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = "abc123";

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     })
// });

var hashedPassword = "$2a$10$f3dpjXkX.fJkqkYPTthsfO3Ez4V/GipbgzK/2hyWDRyhy2Natg4U.";

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
})

// var data = {
//     id: 9
// }

// var token = jwt.sign(data, "123abc");
// console.log(token);

// var decoded = jwt.verify(token, "123abc");
// console.log(decoded);