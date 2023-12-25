const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    productName:String,
    category:String,
    productPrice:Number,
    productImage:String
   
   
})

module.exports = mongoose.model('products',productSchema)