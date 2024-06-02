const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    }
})

userSchema.plugin(passportLocalMongoose);

const userModel = mongoose.model('userModel',userSchema);
module.exports = userModel;