import React, { Component } from 'react'
import { Paper, TextField, Input, InputAdornment, FormHelperText, InputLabel,Button,Typography,Snackbar,IconButton } from "@material-ui/core";
import "../css/create_account.css"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { AccountCircle,VpnKey,Close } from "@material-ui/icons"
import axios from "axios";

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)


const formValid = ({formErrors, ...rest})=>{
    let valid= true;

    Object.values(formErrors).forEach(val=>val.length>0 && (valid = false));
    Object.values(rest).forEach(val=>{
        val===null && (valid=false);
    })
    return valid;
}



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
            Accounts:[],
            open:false,
            invalid:false,
            formErrors:{
                username:"",
                name:"",
                email:"",
                pass:"",

            }
        }
        this.onCreateAccount=this.onCreateAccount.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.onDatabase=this.onDatabase.bind(this)
        this.handleClose=this.handleClose.bind(this)
        this.handleClick=this.handleClick.bind(this)
    }

    handleChange(event){            // It will have specific error message  for the specific input fields
    const name = event.target.name;
    const value = event.target.value;
    let formErrors = this.state.formErrors;
    switch(name){
        case "username":
            formErrors.username= value.length < 3 ? "Minimum 3 characters required":"";
            break;
        case "name":
            formErrors.username= value.length < 3 ? "Minimum 3 characters required":"";
            break;
        case "email":
            formErrors.username=  emailRegex.test(value) ? "":"Invalid Email Address";
            break;
            case "pass":
                    formErrors.username= value.length < 6 ? "Minimum 6 characters required":"";
                    break;
    }
    this.setState({
        formErrors,
        [name]:value
    })
        
    }

    onCreateAccount(event){     //it will create account if Form is filled out Correctly
        event.preventDefault();
        if(formValid(this.state)){
        this.setState(this.state);
        console.log("Register Data:",this.state)
        this.onDatabase() 
        this.setState({
            isCreated:true,
            isAccount:false
        })
    }else{
        // console.error("Form Invalid")
        
            this.handleClick();

       
    }
    }

    async onDatabase(){         //this is the function which will create new account in database
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

    componentWillMount(){           //It will fetch all accounts to check if New user is really different from the previous one
        fetch("http://localhost:3300/account")
        .then(response=>response.json())
        .then((data)=>{
            this.setState({
                Accounts:data
            })
        })
        
    }

     handleClick=()=>{          //To open the Snackbar for Submiting Wrong Filled or Empty Form
        
         this.setState({
             open:true,
         })
        
    }
    handleClose=(event,reason)=>{  //To Close the Snackbar
        if(reason ==="clickaway"){
        return;
        }
       this.setState({
           open:false,
       })
    }

    render() {
        const{formErrors}=this.state;
        return (
            <div className="container">
            {this.state.isAccount &&  <Paper className="paper">
                         <div >
                        <h3 className="heading">Create Account</h3>


 {/* ---------------------------------------------------------------------Form------------------------------------------------------ */}
                        <form className="input">
                        <TextField
                            id="adornment-weight"
                            label="Username"
                            className={formErrors.username.length>0?"error":"inputMargin"}
                            name="username"
                            onChange={this.handleChange}
                            value={this.state.username}
                            />
                            {formErrors.username.length>0 &&(
                                <span style={{color:"red"}}>{formErrors.username}</span>
                                )}

                            {this.state.Accounts.find(user=>user.username === this.state.username)?<span style={{color:"red"}}>Username already taken</span>:""}
                       
                        <TextField
                        
                            id="adornment-weight"
                            label="Name"
                            className="inputMargin"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}

                           />
                        {formErrors.name.length>0 &&(
                                <span style={{color:"red"}}>{formErrors.name}</span>
                                )}

                        <TextField
                            id="adornment-weight"
                            label="Email"
                            className="inputMargin"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}

                            />
                        <span> {formErrors.email.length>0 &&(
                                <span style={{color:"red"}}>{formErrors.username}</span>)}</span>  
                          <span> {this.state.Accounts.find(user=>user.email === this.state.email)?<span style={{color:"red"}}>Email Already Exist</span>:""}</span> 


                        <TextField
                            type="Password"
                            id="adornment-weight"
                            label="Password"
                            className="inputMargin"
                            name="pass"
                            value={this.state.pass}
                            onChange={this.handleChange}

                            endadornment={<InputAdornment position="end"><VpnKey /></InputAdornment>} />
                            {formErrors.pass.length>0 &&(
                                <span style={{color:"red"}}>{formErrors.pass}</span>
                                )}

                    <Button variant="contained" color="primary" className="loginButton" onClick={this.onCreateAccount}>Create Account</Button>
                    </form>
                  
                       
                    </div>
                    <p className="loginLink" onClick={this.props.logCall}>Login</p>

                </Paper>}


{/* ------------------------------------------------Credentials Details After Successfully Account Creation-------------------------------- */}

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
                









  {/* ----------------------------------------------------------------Snack Bar--------------------------------------                                   */}

                <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: "center",
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Please fill out form Correctly </span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
            Try Again
          </Button>,
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            
            onClick={this.handleClose}
          >
            <Close />
          </IconButton>,
        ]}
      />

            </div>
        )
    }
}
