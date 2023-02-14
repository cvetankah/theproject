const config = require('../../pkg/config')
const express = require('express');
const {expressjwt: jwt} = require('express-jwt');
const users = require('./handlers/users');
const db = require('../../pkg/db');
const fileUpload = require('express-fileupload');

db.init();

const api = express();

api.use(fileUpload());
api.use(express.json());
api.use(jwt({
    algorithms: ['HS256'],
    secret: config.get('security').jwt_secret
}).unless({
    path: [
        {url: '/api/v1/users', methods: ['POST']}
    ]
}));

// Users
api.post('/api/v1/users', users.create);
api.get('/api/v1/users', users.getById);
api.put('/api/v1/users', users.update);

api.use(function (err, req, res, next){ // 8
    if (err.name === "UnauthorizedError") {
        res.status(401).send('Invalid token ...');
    } else {
        next(err);
    }
});

api.listen(config.get('services').users.port, err => {
    if(err) {
        return console.log(err)
    }
        return console.log(`Service [users] successfully started on port ${config.get('services').users.port}`)
});