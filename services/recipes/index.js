const config = require('../../pkg/config')
const express = require('express');
const {expressjwt: jwt} = require('express-jwt');
const fileUpload = require('express-fileupload');

const recipes = require('./handlers/recipes');
const db = require('../../pkg/db');
db.init();

const api = express();

api.use(fileUpload());
api.use(express.json());
api.use(jwt({
    algorithms: ['HS256'],
    secret: config.get('security').jwt_secret
}).unless({
    path: [
        {url: /^\/api\/v1\/recipes(\/.+)?/, methods: ['GET']}
    ]
}));

api.get('/api/v1/recipes', recipes.getRecipes);
api.get('/api/v1/recipes/images/:fileName', recipes.getRecipeImage);
api.post('/api/v1/recipes', recipes.createRecipe);

api.get('/api/v1/recipes/:id', recipes.getRecipeById);
api.put('/api/v1/recipes/:id', recipes.updateRecipe);
api.delete('/api/v1/recipes/:id', recipes.deleteRecipeById);

api.put('/api/v1/recipes/:id/like', recipes.likeRecipeWithId)

api.use(function (err, req, res, next){ // 8
    if (err.name === "UnauthorizedError") {
        res.status(401).send('Invalid token ...');
    } else {
        next(err);
    }
});

api.listen(config.get('services').recipes.port, err => {
    if(err) {
        return console.log(err)
    }
        return console.log(`Service [recipes] successfully started on port ${config.get('services').recipes.port}`)
});