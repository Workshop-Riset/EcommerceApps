const express = require('express')
const path = require('path');
const nodemailer = require('nodemailer')
const app = express()
const port = 3000
const routes = require('./routes/index.js')
const session = require('express-session')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views/pages'));

app.use(express.urlencoded({
  extended: true
}));
app.use(session({
  secret: 'rawrr',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    sameSite: true
  }
}))
app.use(express.static(path.join(__dirname, 'public')));
//routes
app.use(routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})