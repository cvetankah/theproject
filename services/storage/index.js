const config = require('../../pkg/config');
const express = require('express');
const {expressjwt: jwt} = require('express-jwt');

const storage = require('./handlers/storage');
const db = require('../../pkg/db');
const fileUpload = require('express-fileupload');
db.init();

const api = express();

api.use(express.json());
api.use(jwt({
    algorithms: ['HS256'],
    secret: config.get('security').jwt_secret
}).unless({
    path: [
        '/api/v1/auth/create-account',
        '/api/v1/auth/login'
        // '/api/v1/storage'
    ]
}));
api.use(fileUpload());

api.post('/api/v1/storage', storage.upload);

api.use(function (err, req, res, next){ // 8
    if (err.name === "UnauthorizedError") {
        res.status(401).send('Invalid token ...');
    } else {
        next(err);
    }
});

api.listen(config.get('services').storage.port, err => {
    if(err) {
        return console.log(err)
    }
        return console.log(`Service [storage] successfully started on port ${config.get('services').storage.port}`)
});