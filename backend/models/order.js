const mongoose = require('mongoose');

let Order = new mongoose.Schema({
customer_email:{
    type:String
},
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
status_of_order_v_side:{
    type:String
},
status_of_order_c_side:{
    type:String
}

});

module.exports = mongoose.model('Order', Order);