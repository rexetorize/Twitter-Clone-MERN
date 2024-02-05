const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const auth = require('./lib/auth');
const routes = require('./routes');
const dbConnect = require('./lib/database');
const redis = require('redis');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// <----------------------------->
//             CORS
const cors = require('cors');
// <----------------------------->

const redisClient  = redis.createClient(6379);
redisClient.on('connect', () => {
  console.log('Redis client connected');
});

const PORT = process.env.PORT || 5000;


const app = express();




// dbConnect();





app.use(bodyParser.json({limit: '50mb'}));

app.use(cors({credentials: true, origin: process.env.FRONTEND_URL}));

app.use('/storage', express.static('storage'));

app.use(session({
    secret: 'keyboard cat',
    name: 'sessionId',
    resave: false,
    saveUninitialized: true,
    store : new RedisStore({
        client : redisClient,
    })
}));

app.use(auth.initialize);
app.use(auth.session);


app.use('/', routes);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        
        console.log('App listening on port '+PORT);
    });

  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });





