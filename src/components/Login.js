import React, { Component } from 'react'
import { Paper, TextField, Input, InputAdornment, FormHelperText, InputLabel } from "@material-ui/core";
import "../css/login.css"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { AccountCircle } from "@material-ui/icons"

export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoggedin: false
        }
    }

    render() {
        return (
            <div className="container">
                <Paper className="paper">
                    <div className="input">
                        <h3>Login to Database</h3>
                        <InputLabel id="weight-helper-text">Username</InputLabel>
                        <Input
                            id="adornment-weight"
                            label="Username"
                            //   onChange={handleChange('weight')}
                            endAdornment={<InputAdornment position="end"><AccountCircle /></InputAdornment>}

                        />
                       
                    </div>
                </Paper>

            </div>
        )
    }
}
