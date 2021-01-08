import React, {Component} from 'react';
// eslint-disable-next-line
import axios from 'axios';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link, Switch,Redirect } from "react-router-dom";

export default class AddProduct extends Component{
// eslint-disable-next-line
    constructor(props) {
        super(props);

        this.state = {
            name:'',
            quantity:'',
            price:'',
            vendor_email:'',
            status:'placed'
        }
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeQuantity=this.onChangeQuantity.bind(this);
        this.onChangePrice=this.onChangePrice.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onChangevendor_email=this.onChangevendor_email.bind(this);
}

    onChangeName(event) {
        this.setState({ name: event.target.value });
    }
    onChangeQuantity(event) {
        this.setState({ quantity: event.target.value });
    }
    onChangePrice(event) {
        this.setState({ price: event.target.value });
    }
    onChangevendor_email(event){
        this.setState({vendor_email:event})
    }
    logout(){
        localStorage.removeItem('email')
        localStorage.removeItem('username')
        localStorage.removeItem('login')

    }
    onSubmit(e){
        e.preventDefault();
        var email=localStorage.getItem('email')
        const newProduct={
            name:this.state.name,
            quantity:this.state.quantity,
            price:this.state.price,
            vendor_email:email,
            status:'placed'
        }
        axios.post('http://localhost:4000/add_product', newProduct)
        .then(res => console.log(res.data));
        // var email=localStorage.getItem('email')
        console.log(email)
        this.vendor_email=this.onChangevendor_email(email)
        this.setState({
            name:'',
            quantity:'',
            price:'',
            vendor_email:'',
            status:'placed'
        });
    }
    render() {
        return (
    <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">Users List</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
  
              {/* <li className="navbar-item">
                <Link to="/create" className="nav-link">Create User</Link>
              </li> */}
              <li className="navbar-item">
                <Link to="/showproduct" className="nav-link">Show Products</Link>
              </li>
              <li className="navbar-item">
                <Link to="/addproduct" className="nav-link">Add Product</Link>
              </li>
              <li className="navbar-item">
                <Link to="/showdispatch" className="nav-link">Dispatchable orders</Link>
              </li>
              <li className="navbar-item">
                <Link to="/showdispatchable" className="nav-link">Dispatched orders</Link>
              </li>
              <li className="navbar-item">
                <Link to="/" className="nav-link" onClick={()=>this.logout()}>Logout</Link>
              </li>
               
            {/* <div > Welcome {localStorage.getItem('username')}</div> */}
            <li className="navbar-item">
                <Link  className="nav-link" >Welcome {localStorage.getItem('username')}</Link>
              </li> 

            </ul>
          </div>
        </nav>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeName}
                               required/>
                    </div>
                    <div className="form-group">
                        <label>Quantity: </label>
                        <input type="Number"
                        min="1" 
                               className="form-control" 
                               value={this.state.quantity}
                               onChange={this.onChangeQuantity}
                               required/>  
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input type="Number" 
                        min="1"
                               className="form-control" 
                               value={this.state.price}
                               onChange={this.onChangePrice}
                               required/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Product" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}