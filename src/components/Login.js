import React, { Component } from 'react'
import { Paper, TextField, Input, InputAdornment, FormHelperText, InputLabel,Button } from "@material-ui/core";
import "../css/login.css"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { AccountCircle,VpnKey } from "@material-ui/icons"

export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoggedin: false,
            Accounts:[]
        }
        this.submitLogin=this.submitLogin.bind(this)
        this.fetchAPI=this.fetchAPI.bind(this)
    }


    submitLogin(e){

    }

    fetchAPI(){
        
        fetch("http://localhost:3200/account")
        .then(response=>response.json())
        .then((account)=>{
           
            this.state.Accounts=account
            
           
        })  
        console.log("Fetched Accounts: ",this.state.Accounts)
    }

    componentWillMount(){
        this.fetchAPI();
    }

    render() {
        return (
            <div className="container">
                <Paper className="paper">
                    <div className="input">
                        <h3>Login to Database</h3>
                        <TextField
                            id="adornment-weight"
                            label="Username"
                            className="inputMargin"
                            name="username"
                            //   onChange={handleChange('weight')}
                            endadornment={<InputAdornment position="end"><AccountCircle /></InputAdornment>} />
                        <TextField
                            type="password"
                            id="adornment-weight"
                            label="Password"
                            className="inputMargin"
                            name="pass"
                            //   onChange={handleChange('weight')}
                            endadornment={<InputAdornment position="end"><VpnKey /></InputAdornment>} />


                    <Button variant="contained" color="primary" className="loginButton" onClick={this.submitLogin}>Log In</Button>

                    <p className="createLink">Don't have an Account? Create One</p>
                       
                    </div>
                </Paper>

            </div>
        )
    }
}
