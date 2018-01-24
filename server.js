const express = require('express')
const bodyParser = require('body-parser')
const pg = require('pg')
const port = process.env.Port || 3010
const app = express()
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const multer = require('multer')
const bcrypt = require('bcrypt')
// DATABASE CONNECTION
const Site = require('./models/models.js')
const Login = require('./models/models.js')
mongoose.connect('mongodb://localhost/Sitedata')
mongoose.connect('mongodb://localhost/Logindata')
mongoose.Promise = global.Promise
//Public
app.use(express.static('public'))
//Body-Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//Multer

// Get All API
app.get('/api',(req,res,next) => {
    console.log(req.body)
    res.send({working:'working'})
    // Site.find((err, site) => {
    //     res.json(site); // return all employees in JSON format
    // })
    // .catch(err => {
    //     res.send(err)
    // })
})

app.post('/api',(req,res,next)=>{
    console.log(req.file)
    Login.create(req.body)
    .then(data => {
        console.log(data)
        res.send({data})
    })
})

//Error
app.use((err, req, res, next) => {
    const status = err.status || 404
    res.status(status).json({ error: err })
})
  
app.use((req, res, next) => {
    res.status(404).json({ error: { status: 404, message: 'Not found' }})
})

const listener = () => console.log( `Listening on port ${port}!`)
app.listen(port, listener)