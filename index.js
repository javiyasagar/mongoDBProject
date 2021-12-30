//node framework
const express = require("express");
const app = express();

//route
const route = require('./app/routes/route');
const routescategory = require('./app/routes/categoryroute');
const routesctuctus = require('./app/routes/contactusroute');
const routestestimonial = require('./app/routes/tastimonialroute')
const routesportfolle = require('./app/routes/portfolleroutes')


//post api - req.body
const bodyParser = require('body-parser');

//database
const mongoose = require('mongoose');

//authorization: cookie - application data storage
const cookieParser = require('cookie-parser');

//private data storage in code
const dotenv = require('dotenv');
dotenv.config();

//database connection - mongodb
mongoose.connect('mongodb://localhost/project')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Json parsing
app.use(bodyParser.json());
// Urlencoded Data parsing
app.use(bodyParser.urlencoded({ extended: true }));

//ejs - view set
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());
app.use('/', route);
app.use('/', routescategory);
app.use('/', routesctuctus);
app.use('/', routestestimonial);
app.use('/', routesportfolle);

app.use(express.static('app/uploads'));

//port listen - project works on port
const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Listening on port ${port}...`));