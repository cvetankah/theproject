const config = require('../../pkg/config')
const express = require('express');
const {expressjwt: jwt} = require('express-jwt');
const users = require('../users/handlers/users');
const db = require('../../pkg/db');
db.init();

const api = express();

api.use(express.json());
api.use(jwt({
    algorithms: ['HS256'],
    secret: config.get('security').jwt_secret
}).unless({
    path: [
        '/api/v1/auth/login'
    ]
}));

// Authentication 
api.post('/api/v1/auth/login', users.login);
// api.post('/api/v1/auth/validate', users.validate);

api.use(function (err, req, res, next){ // 8
    if (err.name === "UnauthorizedError") {
        res.status(401).send('Invalid token ...');
    } else {
        next(err);
    }
});

api.listen(config.get('services').auth.port, err => {
    if(err) {
        return console.log(err)
    }
        return console.log(`Service [auth] successfully started on port ${config.get('services').auth.port}`)
});