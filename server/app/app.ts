// lib/app.ts
import express = require('express');
import { CricbuzzDataAPI } from './cricbuzz-api';

// Create a new express application instance
const app: express.Application = express();

const allowedOrigins = [
    'http://localhost:4200'
];

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', allowedOrigins);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
});

new CricbuzzDataAPI(app);

app.listen(3000, function () {
  console.log(`Example app listening on port 3000`);
});
