const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    }
})

const userModel = mongoose.model('userModel',userSchema);

module.exports = userModel;