import React, {Component} from 'react';
import axios from 'axios';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link, Switch,Redirect } from "react-router-dom";

export default class CreateUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password:'',
            p_type: "vendor",
            selectedOption:'vendor',
            message:''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.on_p_type=this.on_p_type.bind(this);
        this.onchangemessage=this.onchangemessage.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    
    onChangePassword(event){
        this.setState({password: event.target.value});
    }
    onchangemessage(event){
        // console.log("lol")
        this.setState({message:event})
    }
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            p_type: this.state.p_type
        }
        axios.post('http://localhost:4000/check_user_email', newUser)
            .then(  
                res =>{   
                    axios.post('http://localhost:4000/add', newUser)
                        .then(res => console.log(res.data));
                    // console.log("lol1")
                    
                        this.message=this.onchangemessage("User created successfully");
                    // console.log("lol2")

                    }
            )
            .catch(
                err=>{
                    this.message=this.onchangemessage("User not Created");
                    alert("user Already exits");

            });

        
        // <p>User Registered</p>`
        
        this.setState({
            username: '',
            email: '',
            password: '',
            p_type:'vendor',
            selectedOption:'vendor',
            // message:''

        });
    }

    on_p_type(changeEvent) {
        this.setState({
          selectedOption: changeEvent.target.value,
          p_type: changeEvent.target.value
        });
      }
      
      
    render() {
        return (
            
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">Users List</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
  
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create User</Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              {/* <li className="navbar-item">
                <Link to="/addproduct" className="nav-link">Add Product</Link>
              </li> */}
            </ul>
          </div>
        </nav>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               required/>
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               required/>  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               required/>
                    </div>
                    <div className="form-group">
                        <label>
                            <input type="radio" name="p_type" value="vendor" checked={this.state.selectedOption === 'vendor'}  onChange={this.on_p_type}></input>
                            Vendor
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <input type="radio" name="p_type" value="customer" checked={this.state.selectedOption === 'customer'}  onChange={this.on_p_type}></input>
                            Customer
                        </label>
                    </div>  
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                    <div className="form-group">
                        <p>{this.state.message}</p>
                    </div>
                </form>
            </div>
        )
    }
}