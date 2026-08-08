const mongoose=require('mongoose')
const workerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    district: String,
    pincode: String,
    categoryOfWork: String,
    yearOfExperience: String,
   
});

module.exports= mongoose.model('Worker', workerSchema);