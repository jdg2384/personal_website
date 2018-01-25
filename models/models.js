const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;

// const SiteShema = new Schema({
//     imageOne: { 
//         data: Buffer, 
//         contentType: String 
//     },
//     imageTwo: { 
//         data: Buffer, 
//         contentType: String 
//     },
//     imageThree: { 
//         data: Buffer, 
//         contentType: String 
//     },
//     description: String,
//     tech: String,

// });

const LoginShema = new Schema({
    username: String,
    password: String,
    salt:String
});

//const Site = mongoose.model('Site', SiteShema);
const Login = mongoose.model('Login', LoginShema);
module.exports = Login;