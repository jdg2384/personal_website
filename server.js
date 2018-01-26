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
    //console.log(req.body)
    res.send({working:'working'})
    // Site.find((err, site) => {
    //     res.json(site); // return all employees in JSON format
    // })
    // .catch(err => {
    //     res.send(err)
    // })
})

app.get('/login',(req,res,next) => {
    //console.log(req.body)
    //res.send({working:'working'})
    Login.find((err, login) => {
        res.json(login); // return all employees in JSON format
    })
    .catch(err => {
        res.send(err)
    })
})
app.post('/Login',(req,res,next)=>{
    var salt = bcrypt.genSaltSync(4)
    var hash = bcrypt.hashSync(req.body.password, salt);
    Login.create({
        username:req.body.username,
        password:hash,
        salt:salt
    })
    .then(user=>{
        //console.log('user',user)
        res.status(204).send({id:user._id})
    })
})
// app.post('/login',(req,res,next)=>{
//     //console.log('REQ BODY',req.body.username,req.body.password)
//     var salt = bcrypt.genSaltSync(4)
//     var hash = bcrypt.hashSync(req.body.password, salt);
//     let login = new Login(req.body)
    
//     login.save((err, user) => {  
//         if (err) {
//             return res.status(500).send(err);
//         }
//         console.log(user)
//         res.status(200).send(user);
//     })
//     // .then(data => {
//     //     console.log('Data in then',data)
//     //     res.status(204).send({id:data._id})
//     // })
// })

app.post('/check',(req,res,next)=>{
    //console.log("body",req.body)
    Login.findOne({
        username: req.body.username,
    })
    .then( user => {
        console.log('check',user);
        bcrypt.compare(req.body.password, user.password, function(err, ver) {
            //console.log('req.body.password: ',req.body.password,'user.password: ', user.password)
            ver ? res.status(200).send({id:user._id}): res.sendStatus(401)
        })
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