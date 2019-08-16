//DEPENDANCIES
const express = require('express');
const app = express()
const port = 3000;
const mongoose = require('mongoose');
const sessions = require('express-session');

//MIDDLEWARE
app.use(express.json());
app.use(express.static('public'));


app.use(sessions({
  secret: 'feedmeseymour',
  resave: false,
  saveUninitialized: false
}))

//CONTROLLERS
const userController = require('./controllers/users.js');
app.use('/users', userController);
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);
const movieController = require('./controllers/movies.js');
app.use('/movie', movieController);

//MAIN SERVER ROUTE FOR USER LOGIN SESSION

app.get('/movie', (req, res) => {
  if(req.session.currentUser){
    res.json(req.session.currentUser);
  } else {
    res.status(401).json({
      status: 401,
      message: 'Not Logged In'
    });
  }
});

//CONNECT TO MONGO
mongoose.connect('mongodb://localhost:27017/movieList', {useNewUrlParser: true})
mongoose.connection.once('open', () => {
  console.log('connected to mongoose');
})

//APP LISTENER
app.listen(port, () => {
  console.log('listening...');
})
