// IMPORTS ----------------------------- //
// via npm
const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
// via Node
const path = require('path');


// APP INITIALIZATION ------------------ //
const app = express();
const server = app.listen(3000, function() {
  console.log('Server listening on port 3000!');
})
const io = socketio.listen(server);


// ROUTES INITIALIZATION --------------- //
const routes = require('./routes');
app.use('/', routes(io));


// LOGGING MIDDLEWARE ------------------ //
app.use(morgan('dev'));


// BODY-PARSING MIDDLEWARE ------------- //
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
// for ajax requests:
app.use(bodyParser.json());


// TEMPLATING BOILERPLATE SETUP -------- //
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });


// UI CONFIG --------------------------- //
app.use(express.static(path.join(__dirname, '/public')));






// // DB CONFIG -------------------------//
// const models = require('./models');
// models.db.sync({force: true})
// .then(() => {
//   console.log('All tables created!');
//   // LISTEN STATEMT ------------------ //
//   app.listen(3000, function() {
//     console.log('Server chillin on port 3000');
//   });
//   const io = socketio.listen(server);
// })
// .catch(console.error.bind(console));
