import React, { Component } from 'react'
import { Paper, TextField, Input, InputAdornment, FormHelperText, InputLabel,Button,Typography } from "@material-ui/core";
import "../css/create_account.css"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { AccountCircle,VpnKey } from "@material-ui/icons"
import axios from "axios";

export default class CreateAccount extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username:"",
            name:"",
            email:"",
            pass:"",
            isLoggedin: false,
            isCreated:false,
            isAccount:true,
        }
        this.onCreateAccount=this.onCreateAccount.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.onDatabase=this.onDatabase.bind(this)
    }

    handleChange(event){
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
        [name]:value
    })
        
    }

    onCreateAccount(event){
        event.preventDefault();
        this.setState(this.state);
        console.log("Register Data:",this.state)
        this.onDatabase() 
        this.setState({
            isCreated:true,
            isAccount:false
        })
    }

    async onDatabase(){
        const account={
            username:this.state.username,
            name:this.state.name,
            email:this.state.email,
            pass:this.state.pass
        }
        try{
            axios.post("http://localhost:3300/account",account)
            console.log("Account Created on Database:",account);

        }catch{

        }
    }

    render() {
        return (
            <div className="container">
            {this.state.isAccount &&  <Paper className="paper">
                         <div >
                        <h3 className="heading">Create Account</h3>
                        
                        <form className="input">
                        <TextField
                            id="adornment-weight"
                            label="Username"
                            className="inputMargin"
                            name="username"
                            onChange={this.handleChange}
                            value={this.state.username}
                            endadornment={<InputAdornment position="end"><AccountCircle /></InputAdornment>} />

                        <TextField
                        
                            id="adornment-weight"
                            label="Name"
                            className="inputMargin"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}

                           />


                        <TextField
                            id="adornment-weight"
                            label="Email"
                            className="inputMargin"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}

                            />


                        <TextField
                            type="Password"
                            id="adornment-weight"
                            label="Password"
                            className="inputMargin"
                            name="pass"
                            value={this.state.pass}
                            onChange={this.handleChange}

                            endadornment={<InputAdornment position="end"><VpnKey /></InputAdornment>} />


                    <Button variant="contained" color="primary" className="loginButton" onClick={this.onCreateAccount}>Create Account</Button>
                    </form>
                  
                       
                    </div>
                    <p className="loginLink" onClick={this.props.logCall}>Login</p>

                </Paper>}

                {this.state.isCreated &&  <Paper className="paper2">
                        <div className="accountInfo">
                            <Typography variant="h6">Hi! {this.state.name}</Typography>
                            <Typography variant="h6" >Your Account has been Created Successfully!</Typography>
                            <Typography variant="h6" >Kindly note down your credentials</Typography>
                            <Typography variant="subtitle1" >Username: {this.state.username}</Typography>
                            <Typography variant="subtitle1">Password:{this.state.pass}</Typography>
                            <p className="loginLink" onClick={this.props.logCall}>Login</p>
                        </div>
                </Paper>}
                

            </div>
        )
    }
}
