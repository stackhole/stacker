const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const { Pool } = require("pg");

const credentials = {
  user: "postgres",
  host: "database-service.default.svc.cluster.local",
  database: "sample",
  password: "postgres",
  port: 5432,
};

const pool = new Pool(credentials)

app.get('/hello', (req, res) => {
  res.send('hello world')
})

app.get('/db', (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
          console.log(error);
          throw error
        }
        response.status(200).json(results.rows)
      })
  })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})