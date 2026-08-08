const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    address:String,
    pincode:Number,
    district:String,
    mobileno:Number,
    telephoneno:Number
});

module.exports = mongoose.model('Customers', userSchema);
