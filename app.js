const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Show information log at terminal
app.use(morgan('short'))

//Setting route for customer
const router = require('./routes/customerRouter.js')
app.use(router)

//Setting listen port to run
app.listen(3000, () => {
  console.log("App is running")
})
