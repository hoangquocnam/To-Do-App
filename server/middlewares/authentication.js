const jwt = require('jsonwebtoken');
const { handleError } = require('../helper')
const { User } = require('../models')


function authenticate(req, res) {
    try {
        if (!req.headers.authorization) {
            throw new Error('Invalid token.')
        }
        const token = req.headers.authorization.split(' ')[0];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const { userId } = decodedToken;

        return User.findById(userId).then(foundUser => {
            debugger;
            if (!foundUser) {
                throw new Error('Invalid token.')
            }
            else {
            const {username, age, name, gender} = foundUser;
                res.send({
                    status : 'success',
                    account : {username : username, age: age, name: name, gender: gender}
                })
            }
        })
    } catch (err) {
        if (!err.message) {
            handleError(err, 'middlewares/authentication.js', 'authenticate')
        }
        const message = err.message || 'Invalid request!'
        res.statusCode = 401
        res.send(message)
    }
}

module.exports = authenticate