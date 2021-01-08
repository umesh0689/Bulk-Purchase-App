const mongoose = require('mongoose');

let Product = new mongoose.Schema({
name:{
    type:String
},
quantity:{
    type: Number
},

price:{
    type:Number
},
vendor_email:{
    type:String
},
status:{
    type:String
}
});

module.exports = mongoose.model('Product', Product);