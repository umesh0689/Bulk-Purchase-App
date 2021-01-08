import React, {Component} from 'react';
import axios from 'axios';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link, Switch,Redirect } from "react-router-dom";

export default class LoginUser extends Component{
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password:'',
            login:false,
            message:'',
            value:'',
            typee:''
        }   
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onchangemessage=this.onchangemessage.bind(this);
        this.onchangestatus=this.onchangestatus.bind(this);
        this.onchangetypee=this.onchangetypee.bind(this);
    }
    onchangetypee(event){
        this.setState({typee:event})
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
    onchangelogin(event){
        this.setState({login:event})
    }
    onchangestatus(event){
        this.setState({status:event})
    }
    onSubmit(e){
        e.preventDefault();

        const checkUser = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:4000/check_user_email_while_logging', checkUser)
        .then(
            res =>{
                axios.post('http://localhost:4000/check_user_login', checkUser)
                    .then(  
                        res =>{
                            console.log("logined");
                            this.message=this.onchangemessage("User logined successfully");
                            localStorage.setItem("email",checkUser.email);
                            localStorage.setItem("login",this.state.login);
                            localStorage.setItem("username",res.data.username)
                            // console.log("email")
                            // console.log(checkUser.email)
                            // console.log(localStorage.getItem('email'))
                            this.status=this.onchangestatus(200)
                            this.type=this.onchangetypee(res.data.p_type)
                            console.log(res.data)
                            }
                    )
                    .catch(
                        err=>{
                            this.message=this.onchangemessage("User not loggined");
                            // this.state.login=this.onchangelogin(false)
                            // this.props.func(checkUser.email,this.state.login)   
                            console.log("biscuit");
                            // console.log(this.login)
                            alert("Wrong password");
                            this.status=this.onchangestatus(400)

                        
                    });
            }
        )
        .catch(
            err=>{
                this.status=this.onchangestatus(400)
                // this.state.login=this.onchangelogin(false)
                this.message=this.onchangemessage("User doesn't exit");
                alert("Please create an account with given email");
            }

        );
        this.setState({
            email: '',
            password: '',
            typee:''
        });
    }

    render() {
        if(this.state.status===200 && this.state.typee === "vendor" ){
            return <Redirect to="/showproduct"></Redirect>;
        }
        else if(this.state.status===200 && this.state.typee === "customer" ){
            return <Redirect to="/listproduct"></Redirect>;
        }
        else{
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
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                    <div className="form-group">
                        <p>{this.state.message}</p>
                    </div>
                </form>
            </div>
        )}
    }

}