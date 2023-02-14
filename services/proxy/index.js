const config = require('../../pkg/config');
const express = require('express');
const proxy = require('express-http-proxy');

const app = express();
const cors = require("cors");

app.use(cors());

app.use(
    '/api/v1/storage', 
    proxy(
        'http://127.0.0.1:10001',
        { proxyReqPathResolver: (req) => `http://127.0.0.1:10001${req.originalUrl}` }
    )
);

app.use(
    '/api/v1/users', 
    proxy(
        'http://127.0.0.1:10002',
        { proxyReqPathResolver: (req) => `http://127.0.0.1:10002${req.originalUrl}` }
    )
);

app.use(
    '/api/v1/recipes', 
    proxy(
        'http://127.0.0.1:10003',
        { proxyReqPathResolver: (req) => `http://127.0.0.1:10003${req.originalUrl}` }
    )
);

app.use(
    '/api/v1/auth', 
    proxy(
        'http://127.0.0.1:10004',
        { proxyReqPathResolver: (req) => `http://127.0.0.1:10004${req.originalUrl}` }
    )
);

app.use(
    '/', 
    proxy(
        'http://127.0.0.1:3000',
        { proxyReqPathResolver: (req) => `http://127.0.0.1:3000${req.url}` }
    )
);

// app.use(
//     '/',
//     express.static(`${__dirname}/../../web/build`)
// )

const PORT = process.env.PORT || config.get('services').proxy.port;

app.listen(PORT, err => {
    if(err) {
        return console.log(err);
    }
    console.log('Service [proxy] successfully started on port', PORT)
});