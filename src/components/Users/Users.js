import React, { Component } from 'react'
import "../Users/users.css"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper,Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Grid} from '@material-ui/core';
import {faUserEdit,faTrash} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const useStyles = makeStyles(theme => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content',
      
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
  }));

  
export default class Users extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             Students:[],
             setOpen:false,
             open:false,
             openTrash:false,
             setOpenTrash:false,
            
        }
        this.handleClickOpen=this.handleClickOpen.bind(this)
        this.handleClose=this.handleClose.bind(this)
        this.handleTrashOpen=this.handleTrashOpen.bind(this)
        this.handleTrashClose=this.handleTrashClose.bind(this)
        this.editProduct=this.editProduct.bind(this)
    }

  

    editProduct(name){
      console.log(name) 
    }
     
    handleClickOpen = (event)=> {
  
       this.setState({
           setOpen:true,
           open:true,
       })
      
        
      };
    handleTrashOpen=()=>{
      this.setState({
        setOpenTrash:true,
        openTrash:true
      })
    }
  
    
     handleClose = () => {
        this.setState({
            setOpen:false,
            open:false,
            
        })
      };
      handleTrashClose=()=>{
        this.setState({
          setOpenTrash:false,
          openTrash:false
        })
      }

    componentWillMount(){
        fetch("http://localhost:3300/account")
        .then(response=>response.json())
        .then((data)=>{
            this.setState({
                Students:data
            })
        })
    }
    
    render( ) {
     
        return (
          
            <div>
                <h1 className="Heading">{this.state.Students.length} Users</h1>

                <div className="content">

                <Paper className="table">
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Password</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {this.state.Students.map((row,index)=>(
            <TableRow key={index}>
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.pass}</TableCell>
              <TableCell align="right"><FontAwesomeIcon icon={faUserEdit} onClick={this.handleClickOpen} className="edit" /></TableCell>
              <TableCell align="right"><FontAwesomeIcon icon={faTrash}  onClick={this.handleTrashOpen} className="trash"/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>






















    <Dialog open={this.state.open} onClose={this.handleClose} className="dialog"
     fullWidth="true"
     maxWidth="md">
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit User Details
          </DialogContentText>
            <Grid container spacing={3} className="dialog">
                <Grid item xs={3} >
                <TextField
        id="outlined-email-input"
        label="Name"
        type="text"
        name="name" 
        margin="normal"
        variant="outlined"
      />
                </Grid>
           
            <Grid item xs={3}>
                <TextField
        id="outlined-email-input"
        label="Username"
        type="text"
        name="username"
        margin="normal"
        variant="outlined"
      />
                </Grid>
                <Grid item xs={3}>
                <TextField
        id="outlined-email-input"
        label="Email"
        type="text"
        name="email"
        margin="normal"
        variant="outlined"
      />
                </Grid>
                <Grid item xs={3}>
                <TextField
        id="outlined-email-input"
        label="Password"
        type="text"
        name="Pass"
        margin="normal"
        variant="outlined"
      />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>











      <Dialog
        open={this.state.openTrash}
        onClose={this.handleTrashClose}
      >
        <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Are you sure you want to delete {this.state.Students.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleTrashClose} color="primary">
           I am Sure
          </Button>
          <Button onClick={this.handleTrashClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
                </div>

            </div>
        )
    }
}
