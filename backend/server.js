const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

let User = require('./models/user');
let Product = require('./models/product');
let Order = require('./models/order')
app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});
userRoutes.route('/showproducts').get(function(req, res){
    Product.find(function(err, products){
        if(err){
            console.log(err);
        } else{
            res.json(products);
        }
    });
});
userRoutes.route('/showorders').get(function(req, res){
    Order.find(function(err, products){
        if(err){
            console.log(err);
        } else{
            res.json(products);
        }
    });
});
userRoutes.route('/cancelproduct').post(function(req,res){
    var temp={status : "cancelled"}
    Product.update(req.body,temp)
    .then(()=>{
        var query={
         vendor_email:req.body.vendor_email,
         name:req.body.name,
        }
        var lol={
            status_of_order_c_side:'cancelled',
            status_of_order_v_side:'cancelled'
        }
        Order.update(query,lol)
        .then(()=>{console.log("done")})
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json("Error")
    })
});
userRoutes.route('/dispatch').post(function(req,res){
    var temp={status : "dispatched"}
    Product.update(req.body,temp)
    .then(()=>{
        var query={
         vendor_email:req.body.vendor_email,
         name:req.body.name,
        }
        var lol={
            status_of_order_c_side:'dispatched',
            status_of_order_v_side:'dispatched'
        }
        Order.update(query,lol)
        .then(()=>{console.log("done done")})
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json("Error")
    })
});
userRoutes.route('/sortquantity').get(function(req, res){
    Product.find(function(err, products){
        if(err){
            console.log(err);
        } else{
            res.json(products);
        }
    }).sort('quantity');

});
userRoutes.route('/sortprice').get(function(req, res){
    Product.find(function(err, products){
        if(err){
            console.log(err);
        } else{
            res.json(products);
        }
    }).sort('price');

});
userRoutes.route('/orderplacing').post(function(req,res){
    // console.log(req)
    var query={
        name:req.body.name,
        quantity:req.body.quantity,
        price:req.body.price,
        vendor_email:req.body.vendor_email,
        status:req.body.status
    }
    var tempp={quantity:req.body.quantity-req.body.required}
    // console.log(temp)
    if(tempp.quantity===0){
        // console.log("lanja")
        tempp.status='ready'
        // query.status='ready'
    }
    // if(tempp >=0 ){
    var c_email=req.body.c_email
    // console.log("c_email")
    // console.log(c_email)
    // console.log(tempp)
    Product.updateOne(query,tempp)
    .then(()=>
    {
        var  ord ={
            customer_email:c_email,
            name:req.body.name,
            quantity:req.body.required,
            vendor_email:req.body.vendor_email,
            status_of_order_v_side:req.body.status,
            status_of_order_c_side:'waiting',
            price:req.body.price
        }
        var chg={
            customer_email:c_email,
            name:req.body.name,
            // quantity:req.body.required,
            vendor_email:req.body.vendor_email,
            status_of_order_v_side:req.body.status,
            status_of_order_c_side:'waiting',
            price:req.body.price  
        }
        var chgg={
            status_of_order_c_side:'placed'
        }
        if(tempp.quantity===0){
            ord.status_of_order_c_side='placed'
            Order.updateMany(chg,chgg)
            .then(()=>console.log("yes"))
            .catch(()=>console.log("No"))

        }
        let order=new Order(ord)
        order.save()
        .then(order =>{
            res.status(200).json({'Order': 'Order placed successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json("Error")
    })
// }
    // else{
    //     res.status(400).json("Error")
    // }
    


});
// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    var val=req.body.password
    var hash = bcrypt.hashSync(val, salt);
    req.body.password= hash    
    let user = new User(req.body);
    
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});
userRoutes.route('/add_product').post(function(req,res){
    let product= new Product(req.body);
    product.save()
        .then(product =>{
            res.status(200).json({'Product': 'Product added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});


userRoutes.route('/check_user_email').post(function(req,res){
    User.findOne({email:req.body.email})
    .then(user =>{
        if(!user){
            res.status(200).json({'User':'No other user exist'});
        }
        else{
            res.status(400).json('Error');
        }
    });
});

userRoutes.route('/check_user_email_while_logging').post(function(req,res){
    User.findOne({email:req.body.email})
    .then(user =>{
        if(user){
            res.status(200).json({'User':'User exist'});
        }
        else{
            res.status(400).json('Error');
        }
    });
});
userRoutes.route('/check_user_login').post(function(req,res){
    var val=req.body.password
    var hash = bcrypt.hashSync(val, salt);
    req.body.password= hash
    User.findOne({email:req.body.email})
    .then(user =>{
        ans=bcrypt.compareSync(val,user.password);
        if(ans){
        var vall={
            p_type:user.p_type,
        username:user.username}
        // console.log(vall)
            res.status(200).json(vall);
        }
        else{
            res.status(400).json({'User':'Password is wrong'});
        }
 
    });
});

// userRoutes.route('/show_products').post(function(req,res){
// var email=localStorage.getItem('email')
//     Product.find({vendor_email:email})
//     .then()

// });
// Getting a user by id
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});