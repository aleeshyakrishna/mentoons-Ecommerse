
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://aleeshyakrishnamv:D8dyHCX874HrFvsX@cluster0.wps8szx.mongodb.net/mentoons')

mongoose.connection.once('open',()=>console.log('database connected')).on('error',error=>{
console.log(error);
})