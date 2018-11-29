const express = require('express')
const mysql = require('mysql')
const router = express.Router();

//Connection to database with pool type
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'nguyennqh123!@#',
  database: 'mydatabase'
})

//Route get list of customer
router.get('/', (req, res) => {
  const queryString = "SELECT * FROM customer_data"
  pool.query(queryString, (err, rows, fields) => {
    if(err) {
      console.log("Error")
      res.sendStatus(500)
      return
    }
    res.render('customers', {
      data: rows
    })
  })
})

//Route get specific customer base on id
router.get('/user/:id', (req, res) => {
  const customer_id = req.params.id //get id from url
  const queryString = "SELECT * FROM customer_data WHERE id = ?"
  pool.query(queryString, [customer_id], (err, rows, fields) => {
    if(err) {
      console.log("Error")
      res.sendStatus(500)
      return
    }
    res.json(rows)
  })
})

//Route add customer
router.post('/add', (req, res) => {
  const customer_data = req.body
  console.log(req.body)
  const queryString = "INSERT INTO customer_data SET ?"
  pool.query(queryString, [customer_data], (err, rows, fields) => {
    if(err) {
      console.log("Error")
      res.sendStatus(500)
      return
    }
    res.redirect('/')
  })
})

//Route delete customer base on id
router.get('/delete/:id', (req, res) => {
  const customer_id = req.params.id
  const queryString = "DELETE FROM customer_data WHERE id = ?"
  pool.query(queryString, [customer_id], (err, rows, fields) => {
    if(err) {
      console.log("Error")
      res.sendStatus(500)
      return
    }
    res.redirect('/')
  })
})

//Route update customer
router.post('/update/:id', (req, res) => {
  const customer_id = req.params.id
  const customer_data = req.body
  const queryString = "UPDATE customer_data SET ? WHERE id = ?"
  pool.query(queryString, [customer_data, customer_id], (err, rows, fields) => {
    if(err) {
      console.log("Error")
      res.sendStatus(500)
      return
    }
    res.redirect('/')
  })
})

//Route update customer
router.get('/update/:id', (req, res) => {
  const customer_id = req.params.id
  const queryString = "SELECT * FROM customer_data WHERE id = ?"
  pool.query(queryString, [customer_id], (err, rows, fields) => {
    if(err) {
      console.log("Error")
      res.sendStatus(500)
      return
    }
    res.render('customers_edit',{
      data: rows[0]
    })
  })
})

module.exports = router
