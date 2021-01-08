import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import LoginUser from './components/login-user.component'
import AddProduct from './components/add-product.component'
import showproduct from './components/show-products.component'
import listproduct from './components/list-products.component'
import showorder from'./components/show-orders.component'
import showdispatch from './components/show-dispatch-orders.component'
import showdispatchable from'./components/show-dispatchable-orders-component'
function App() {
  return (
    <Router>
      <div className="container">
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">Users List</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
  
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create User</Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="navbar-item">
                <Link to="/addproduct" className="nav-link">Add Product</Link>
              </li>
            </ul>
          </div>
        </nav> */}

        {/* <br/> */}
        <Route path="/" exact component={UsersList}/>
        <Route path="/create" component={CreateUser}/>
        <Route path="/login" component={LoginUser}/>
        <Route path="/addproduct" component={AddProduct}/>
        <Route path="/showproduct" component={showproduct}/>
        <Route path="/listproduct" component={listproduct}/>
        <Route path="/showorder" component={showorder}/>
        <Route path="/showdispatch" component={showdispatch}/>
        <Route path="/showdispatchable" component={showdispatchable}/>
        
      </div>
    </Router>
  );


}
export default App;
