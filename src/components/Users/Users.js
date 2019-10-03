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
import axios from "axios"




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

  var data2={}
export default class Users extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             Students:[],
             username:"",
             name:"",
             email:"",
             Search:"",
             pass:"",
             open:false,
             openTrash:false,
             isCliked:false,
            
        }
        this.handleClickOpen=this.handleClickOpen.bind(this)
        this.handleClose=this.handleClose.bind(this)
        this.handleTrashOpen=this.handleTrashOpen.bind(this)
        this.handleTrashClose=this.handleTrashClose.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.onEditSubmit=this.onEditSubmit.bind(this)
        this.deleteData=this.deleteData.bind(this)
        this.updateSearch=this.updateSearch.bind(this)
        
    }

  componentWillUpdate(){
    this.componentWillMount();
  }


  updateSearch(event){    //Search Function
      
    this.setState({Search:event.target.value.substr(0,20)});
    
  }

    handleChange(event){
      const name=event.target.name;
      const value= event.target.value;
      this.setState({
        [name]:value
      })
    }

    onEditSubmit(event){
      event.preventDefault()
      this.setState(this.state)
      console.log("Edited Data: ",this.state)
      axios.put("http://localhost:3300/account/"+data2._id,{
        username:this.state.username==="" ? data2.username:this.state.username,
        name:this.state.name ===""? data2.name : this.state.name,
        email:this.state.email === ""? data2.email:this.state.email,
        pass:this.state.pass === ""? data2.pass: this.state.pass
      }) .then(res=>{
        console.log("Updated Data:",res.data)
      }).then(this.setState({
        username:"",
        name:"",
        email:"",
        pass:"",
        open:false,
        
      }))
      this.handleClose();
      this.componentWillUpdate();
    }

    deleteData(event){
      event.preventDefault();
      axios.delete("http://localhost:3300/account/"+data2._id).then(res=>{
        console.log(res.data)
      })
      this.handleTrashClose();
      this.componentWillUpdate();
    }

wrapperDelete(id){
  this.setState({
    isClicked:true
  })
  this.handleTrashOpen();
  this.props.editUser(id);
}


   wrapper(id){
     this.setState({
       isClicked:true
     })
     this.handleClickOpen();
     this.props.editUser(id);
    
   }
     
    handleClickOpen = ()=> {
     
       this.setState({
           open:true,
       })
     
      };



    handleTrashOpen=()=>{
      this.setState({
        openTrash:true
      })
    }
  
    
     handleClose = () => {
        this.setState({
            open:false,
            
        })
      };
      handleTrashClose=()=>{
        this.setState({
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
      var data = [];
      
      if(this.state.isClicked){
      data=(this.state.Students.filter((st)=>{
        // console.log("props:",this.props.uid,"row id:",st._id)
       
          return(this.props.uid.toString().search(st._id.toString())!==-1)

      }))
     
      data2=data[0];
      
      // console.log('filter data=',data);
    }


    let Users2 =  this.state.Students.filter((student)=>{        // To Search the Student from Database
      return student.username.toLowerCase().indexOf(this.state.Search) !==-1||
      student.email.toLowerCase().indexOf(this.state.Search) !==-1 ||
      student.name.toLowerCase().indexOf(this.state.Search) !==-1;
    })

        return (
          
            <div>
              {/* {console.log("User:",this.props.uid)} */}
                <h1 className="Heading">{this.state.Students.length} Users</h1>

                <div className="content">

                <Paper className="table">
                <TextField  
       id="adornment-weight"
      label="Search Anything"
      className="search"
      name="search"
      value={this.state.Search}
      onChange={this.updateSearch}
      />
     <Table stickyHeader >
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
         {Users2.map((row,index)=>(
            <TableRow key={index}>
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.pass}</TableCell>
              <TableCell align="right"><FontAwesomeIcon icon={faUserEdit}  onClick={()=>this.wrapper(row._id)} className="edit" /></TableCell>
              <TableCell align="right"><FontAwesomeIcon icon={faTrash}  onClick={()=>this.wrapperDelete(row._id)} className="trash"/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>






















    <Dialog open={this.state.open} onClose={this.handleClose} className="dialog"
     fullWidth="true"
     maxWidth="md">
       <form>
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit <span className="edit2"></span> Details
          </DialogContentText>
            <Grid container spacing={3} className="dialog">
              
                <Grid item xs={3} >
                <TextField
        id="outlined-email-input"
        label="Name"
        type="text"
        name="name"
        value={this.state.name}
        onChange={this.handleChange} 
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
        value={this.state.username}
        onChange={this.handleChange}
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
        value={this.state.email}
        onChange={this.handleChange}
        margin="normal"
        variant="outlined"
      />
                </Grid>
                <Grid item xs={3}>
                <TextField
        id="outlined-email-input"
        label="Password"
        type="text"
        name="pass"
        value={this.state.pass}
        onChange={this.handleChange}
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
          <Button type="submit" onClick={this.onEditSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
        </form>
      </Dialog>











      <Dialog
        open={this.state.openTrash}
        onClose={this.handleTrashClose}
      >
        <DialogTitle id="alert-dialog-title">{"Delete"} <span className="edit2"></span></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleTrashClose} color="primary">
           No
          </Button>
          <Button onClick={this.deleteData} color="primary" autoFocus>
            YES I AM SURE
          </Button>
        </DialogActions>
      </Dialog>
                </div>

            </div>
        )
    }
}
