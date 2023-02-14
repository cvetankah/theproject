const mongoose = require('mongoose');
const config = require('../config');

const init = () => {
    const url = config.get('db').url;
    const username = config.get('db').username;
    const password = config.get('db').password;
    const dbname = config.get('db').dbname;

    const dsn = `mongodb+srv://${username}:${password}@${url}/${dbname}?retryWrites=true&w=majority`;
    // const dsn = 'mongodb+srv://cvetankah:cvetanka1992@cluster0.qj0lf6h.mongodb.net/theProject?retryWrites=true&w=majority';
    mongoose.connect(
        dsn,
        err => {
            if(err) {
                console.log('Could not connect to db', err);
            }
            return console.log('Successfully connected to db')
        }
    )
};

module.exports = {
    init
};