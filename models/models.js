const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;

const SiteShema = new Schema({
    imageOne: { 
        data: Buffer, 
        contentType: String 
    },
    imageTwo: { 
        data: Buffer, 
        contentType: String 
    },
    imageThree: { 
        data: Buffer, 
        contentType: String 
    },
    description: String,
    tech: String,

});

const LoginShema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

const Site = mongoose.model('Site', SiteShema);
const Login = mongoose.model('Login', LoginShema);
module.exports = Site , Login;