import React, {Component} from 'react';
// eslint-disable-next-line
import axios from 'axios';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link, Switch,Redirect } from "react-router-dom";

export default class showorder extends Component{
    constructor(props){
        super(props);
        this.state={
            orders: [],
            email:localStorage.getItem('email')
        }
    }
    componentDidMount() {
        axios.get('http://localhost:4000/showorders')
             .then(response => {
                 this.setState({orders: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    
}
logout(){
    localStorage.removeItem('email')
    localStorage.removeItem('username')
    localStorage.removeItem('login')

}
edit(){}
render(){
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
        {/* <div className="form-group">
            <label>Product Name:</label>
            <input type="text" 
                               className="form-control" 
                                   value={this.state.name}
                                   onChange={this.onChangeName}
                               />
        </div> */}
        {/* <div className="form-group">
            <input type="submit" value="search" className="btn btn-primary" onClick={this.search}/>
        </div> */}
        <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Vendor_Email</th>
                                <th>Status</th>
                                {/* <th>Required</th> */}
                                {/* <th>Type</th> */}
                            </tr>
                        </thead>
                        <tbody>
                        { 
                            this.state.orders.map((currentOrder, i) => {
                                if(currentOrder.customer_email === this.state.email){
                                    var prod=currentOrder
                                return (
                                    <tr>
                                        <td>{currentOrder.name}</td>
                                        <td>{currentOrder.quantity}</td>
                                        <td>{currentOrder.price}</td>
                                        <td>{currentOrder.vendor_email}</td>
                                        <td>{currentOrder.status_of_order_c_side}</td>
                                        {/* <td>{}</td> */}
                                        {/* <Number>{}</Number> */}
                                        {/* <input  id="required" name="required" min="1" max ={currentProduct.quantity} onChange={this.onChangerequired} /> */}
                                        {/* <td>{currentUser.p_type}</td> */}
                                        {/* <input type="submit" value="order" className="btn btn-primary" onClick={()=>this.order(prod)} /> */}
                                        {(currentOrder.status_of_order_c_side==='waiting')?
                                        ( <input  id="required" type="Number"name="required" min="1"  onChange={this.onChangerequired} /> ):
                                        (console.log(""))}
                                        {(currentOrder.status_of_order_c_side==='waiting')?
                                        ( <input type="submit" value="Edit Quantity" className="btn btn-primary" onClick={()=>this.edit(prod)} /> ):
                                        (console.log(""))}
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