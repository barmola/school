import React, { Component } from 'react'
import "../css/login_true.css"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default class LoginTrue extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

   
    render() {
        return (
            <div className="photo">
                <div>
                    <img src={require("../images/access.png")} className="loginPic" />
                    <div>
                    {/* <Grid container spacing={3}>

                        <Grid item xs={7}>
                        </Grid>
                        <Grid item xs={5}>
                          <img src={require("../images/access.png")} className="accessPic" />
                        </Grid>
                       
                    </Grid> */}
                           <h2 className="accessText">Login Successfull.</h2>
                          <h2 className="accessText">You Have been Granted the access of School Database!.</h2>
                    </div>
                    </div>
            </div>
        )
    }
}
