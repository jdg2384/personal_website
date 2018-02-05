const express = require('express')
const bodyParser = require('body-parser')
const pg = require('pg')
const path = require('path')
var fs = require('fs')
const port = process.env.Port || 3010
const app = express()
const mongodb = require('mongodb')
const mongoose = require('mongoose')
var Schema = mongoose.Schema;
var multer = require('multer')
var upload = multer({ dest: './uploads' })
const bcrypt = require('bcrypt')

// DATABASE CONNECTION
const Site = require('./models/models.js')
const Login = require('./models/models.js')
mongoose.connect('mongodb://localhost/Sitedata')
//mongoose.connect('mongodb://localhost/Logindata')
mongoose.Promise = global.Promise

//app.use(multer({dest:'./uploads/'}).single('singleInputFileName'));
// Multer Jazz 
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});

var upload = multer({storage: storage}).single('myimage');

//Public
app.use(express.static('public'))
//Body-Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Get All API
app.get('/api',(req,res,next) => {
    // console.log(req.body)
    // res.send({working:'working'})
    Site.find((err, site) => {
        res.json(site); // return all employees in JSON format
    })
    .catch(err => {
        res.send(err)
    })
})

// Post for Pojects
app.post('/projects',(req,res,next)=>{
    Site.create({
        imageOne:req.body.imageOne,
        imageTwo:req.body.imageTwo,
        imageThree:req.body.imageThree,
        description:req.body.description,
        tech:req.body.tech,
        github:req.body.github,
    })
    console.log(req.files.imageOne)
    .then(project=>{
        //console.log('user',user)
        res.status(204).send({id:project._id})
    })
})

/// ALL LOG IN ROUTES

//Get All route 
app.get('/login',(req,res,next) => {
    Login.find((err, login) => {
        res.json(login); 
    })
    .catch(err => {
        res.send(err)
    })
})

//Signup
// app.post('/Login',(req,res,next)=>{
//     var salt = bcrypt.genSaltSync(4)
//     var hash = bcrypt.hashSync(req.body.password, salt);
//     Login.create({
//         username:req.body.username,
//         password:hash,
//         salt:salt
//     })
//     .then(user=>{
//         //console.log('user',user)
//         res.status(204).send({id:user._id})
//     })
// })
// // Auth Route
// app.post('/check',(req,res,next)=>{
//     //console.log("body",req.body)
//     Login.findOne({
//         username: req.body.username,
//     })
//     .then( user => {
//         console.log('check',user);
//         bcrypt.compare(req.body.password, user.password, function(err, ver) {
//             ver ? res.status(200).send({id:user._id}): res.sendStatus(401)
//         })
//     })
// })

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