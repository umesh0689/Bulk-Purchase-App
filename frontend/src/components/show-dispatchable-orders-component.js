import React, {Component} from 'react';
// eslint-disable-next-line
import axios from 'axios';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link, Switch,Redirect } from "react-router-dom";
// import styles from '../App.module.css'

export default class showdispatchable extends Component{
    constructor(props){
        super(props);
        this.state = {
            products: [],
        email:localStorage.getItem('email')}

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
    // cancel(e){
    //     axios.post('http://localhost:4000/cancelproduct',e)
    //     axios.get('http://localhost:4000/showproducts')
    //     .then(response => {
    //         this.setState({products: response.data});
    //     })
    //     .catch(function(error) {
    //         console.log(error);
    //     })
    //     // this.render()
    //     // window.location.reload(false)
    // }
    logout(){
        localStorage.removeItem('email')
        localStorage.removeItem('username')
        localStorage.removeItem('login')

    }
    // dispatch(e){
    //     axios.post('http://localhost:4000/dispatch',e)

    // }
    render() {
        // console.log(localStorage.getItem('username'))
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
            {/* <li className="name">Hello{localStorage.getItem('username')}</li> */}
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
            <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                {/* <th>Type</th> */}
                            </tr>
                        </thead>
                        <tbody>
                        { 
                        
                            this.state.products.map((currentProduct, i) => {
                                if(currentProduct.vendor_email === this.state.email && currentProduct.status === 'dispatched'){
                                    var prod=currentProduct
                                return (
                                    <tr>
                                        <td>{currentProduct.name}</td>
                                        <td>{currentProduct.quantity}</td>
                                        <td>{currentProduct.price}</td>
                                        {/* <td>{currentUser.p_type}</td> */}
                                        {/* <input type="submit" value="Cancel" className="btn btn-primary" onClick={()=>this.cancel(prod)} /> */}
                                        {/* <input type="submit" value="Dispacth" className="btn btn-primary" onClick={()=>this.dispatch(prod)} /> */}

                                    </tr>
                                )
                            }
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}