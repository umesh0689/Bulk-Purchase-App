import React, {Component} from 'react';
// eslint-disable-next-line
import axios from 'axios';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link, Switch,Redirect } from "react-router-dom";

export default class listproduct extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            products: [],
            required:''
        }
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangerequired=this.onChangerequired.bind(this);
        this.sortprice=this.sortprice.bind(this);
        this.sortquantity=this.sortquantity.bind(this);
        this.render=this.render.bind(this);


    }
    componentDidMount() {
        axios.get('http://localhost:4000/showproducts')
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    onChangerequired(event) {
        this.setState({ required: event.target.value });
    }
    onChangeName(event) {
        this.setState({ name: event.target.value });
    }
    logout(){
        localStorage.removeItem('email')
        localStorage.removeItem('username')
        localStorage.removeItem('login')

    }   
    search(e){
        axios.get('http://localhost:4000/showproducts')
        .then(response => {
            this.setState({products: response.data});
        })
        .catch(function(error) {
            console.log(error);
        })
    }
    // reload(){
    //     window.location.reload()
    // }
    order(e){
        if(this.state.required <= e.quantity && this.state.required >0){
        e.required=this.state.required
        e.c_email=localStorage.getItem('email')
        console.log(e)
        axios.post('http://localhost:4000/orderplacing',e)
        .then(()=>window.location.reload())
        // this.reload()
        }
    }
    sortquantity(){
        axios.get('http://localhost:4000/sortquantity')
             .then(response => {
                //  console.log("lanja")
                 console.log(response.data)
                //  this.render()
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    sortprice(){
        axios.get('http://localhost:4000/sortprice')
        .then(response => {
            // console.log("lanja")
            console.log(response.data)
           //  this.render()
            this.setState({products: response.data});
        })
        .catch(function(error) {
            console.log(error);
        })
    }
    render() {
        return (
    <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">Users List</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
  
              <li className="navbar-item">
                <Link to="/listproduct" className="nav-link">Products</Link>
              </li>
            
              <li className="navbar-item">
                <Link to="/showorder" className="nav-link">Your Orders</Link>
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
        <div className="form-group">
            <label>Product Name:</label>
            <input type="text" 
                               className="form-control" 
                                   value={this.state.name}
                                   onChange={this.onChangeName}
                               />
        </div>
        {/* <div className="form-group">
            <input type="submit" value="search" className="btn btn-primary" onClick={this.search}/>
        </div> */}
        <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                {/* <th>Quantity</th> */}
                                <th>
                                    <Link onClick={()=>this.sortquantity()}>Quantity</Link>
                                </th> 
                                {/* <th>Price</th> */}
                                <th>
                                    <Link onClick={()=>this.sortprice()}>Price</Link>
                                </th>  
                                <th>Vendor_Email</th>
                                <th>Required</th>
                                {/* <th>Type</th> */}
                            </tr>
                        </thead>
                        <tbody>
                        { 
                        
                            this.state.products.map((currentProduct, i) => {
                                if(this.state.name){
                                if(currentProduct.name === this.state.name && currentProduct.status === 'placed'){
                                    var prod=currentProduct
                                return (
                                    <tr>
                                        <td>{currentProduct.name}</td>
                                        <td>{currentProduct.quantity}</td>
                                        <td>{currentProduct.price}</td>
                                        <td>{currentProduct.vendor_email}</td>
                                        {/* <td>{}</td> */}
                                        {/* <Number>{}</Number> */}
                                        <input  id="required" type="Number"name="required" min="1" max ={currentProduct.quantity} onChange={this.onChangerequired} />
                                        {/* <td>{currentUser.p_type}</td> */}
                                        <input type="submit" value="order" className="btn btn-primary" onClick={()=>this.order(prod)} />
                                    </tr>
                                )
                            }}
                            else{
                                if(currentProduct.status === 'placed'){
                                    var prod=currentProduct
                                    return (
                                        <tr>
                                            <td>{currentProduct.name}</td>
                                            <td>{currentProduct.quantity}</td>
                                            <td>{currentProduct.price}</td>
                                            <td>{currentProduct.vendor_email}</td>
                                            {/* <td>{}</td> */}
                                            {/* <Number>{}</Number> */}
                                            <input  id="required" type="Number"name="required" min="1" max ={currentProduct.quantity} onChange={this.onChangerequired} />
                                            {/* <td>{currentUser.p_type}</td> */}
                                            <input type="submit" value="order" className="btn btn-primary" onClick={()=>this.order(prod)} />
                                        </tr>
                                    )
                                }
                            }
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}