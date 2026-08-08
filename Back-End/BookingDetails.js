const mongoose=require('mongoose')
const bookSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phone: String,
    district: String,
    pincode: String,
    workeremail:String
});

module.exports= mongoose.model('booking', bookSchema);