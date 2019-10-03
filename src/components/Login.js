import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Paper, TextField, Input, InputAdornment, FormHelperText, InputLabel,Button,Snackbar,IconButton } from "@material-ui/core";
import "../css/login.css"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { AccountCircle,VpnKey,Close } from "@material-ui/icons"
import LoginTrue from "../components/LoginTrue"
import App from '../App';


export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoggedin: false,
            username:"",
            pass:"",
            loginDetail:[],
            Accounts:[],
            open:false,
        }
        this.submitLogin=this.submitLogin.bind(this)
        this.onhandleChange=this.onhandleChange.bind(this)
        this.fetchAPI=this.fetchAPI.bind(this)
        this.handleClose=this.handleClose.bind(this)
        this.handleClick=this.handleClick.bind(this)

    }


    submitLogin(event){
        event.preventDefault();
        this.setState(this.state)
        const login={  //Storing the entered input values in Login Constant
            username:this.state.username,
            pass:this.state.pass
        }
                console.log(login)
                let len=this.state.Accounts.length;
                let c=0;
                let res=this.state.Accounts.map((data)=>{
            if(data.username===login.username && data.pass===login.pass){       //Checking if Login Credentials are Valid
                return 
            }
            
          c+=1;

        })
        console.log(res);
        if(c<len){

            ReactDOM.render(
           <App test={true} />, document.getElementById('root') 
            );
        }
        else{
            this.handleClick();

        }
    }
    onhandleChange(event){              //Storing Values to their respective Names 
        const name=event.target.name;
        const value=event.target.value;
        this.setState({
            [name]:value
        })
    }

    handleClick=()=>{       //It will pop out a Snackbar if user enter Wrong Credentials
        
        this.setState({
            open:true,
        })
       
   }
   handleClose=(event,reason)=>{   // For Closing the Snackbar
       if(reason ==="clickaway"){
       return;
       }
      this.setState({
          open:false,
      })
   }
    

    fetchAPI(){         //It will fetch all accounts before login
         
        fetch("http://localhost:3300/account")
        .then(response=>response.json())
        .then((account)=>{
                        // this.state.Accounts=account
            this.setState({
                Accounts:account
            },()=>{
                console.log("Fetched Accounts: ",this.state.Accounts)

            })
            
           
        })  
    }

    componentDidMount(){
        this.fetchAPI();
    }

    render() {
        return (
            <div className="container">
                {/* <div>
                    <img src={require("../images/LOGO.png")} className="logo" />
                </div> */}

{/* ------------------------------------------------------------Login Form------------------------------------------ */}
                <Paper className="paper">
                    <div className="input">
                    <img src={require("../images/LOGO.png")} className="logo" />
                        <h3 className="login">Login to Database</h3>
                        <TextField
                            id="adornment-weight"
                            label="Username"
                            className="inputMargin"
                            name="username"
                            value={this.state.username}
                            onChange={this.onhandleChange}
                            endadornment={<InputAdornment position="end"><AccountCircle /></InputAdornment>} />
                        <TextField
                            type="password"
                            id="adornment-weight"
                            label="Password"
                            className="inputMargin"
                            name="pass"
                            value={this.state.pass}
                            onChange={this.onhandleChange}
                            endadornment={<InputAdornment position="end"><VpnKey /></InputAdornment>} />


                    <Button variant="contained" color="primary" className="loginButton" onClick={this.submitLogin}>Log In</Button>

                    <p className="createLink" onClick={this.props.regCall}>Don't have an Account? Create One</p>
                       
                    </div>
                </Paper>
                {/* <div>
                    <img src={require("../images/LOGO.png")} className="logo"/>
                </div> */}




{/* ------------------------------------------------------------SnackBar------------------------------------------------------ */}

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
        message={<span id="message-id">Wrong Credentials</span>}
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
