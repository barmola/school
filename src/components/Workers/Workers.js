import React, { Component } from 'react'
import "../Students/students.css"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper,Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Grid,Select,InputLabel,MenuItem,Input,FormControl} from '@material-ui/core';
import {faUserEdit,faTrash} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Refresh from "@material-ui/icons/Refresh"
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

  const paper={
    width:"1000px",
    
  }
 const dialog={
   display:"flex",
   flexDirection:"row",
   justifyContent:"center",
   alignItems:"center"
 }
 const formControl={
  minWidth: 120,
  maxWidth: 300,
}

var data2={}
export default class Workers extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             Workers:[],
             Subjects:[],
             setOpen:false,
             open:false,
             subjectOpen:false,
             setSubjectOpen:false,
             setOpenTrash:false,
             openTrash:false,
             name:"",
             age:"",
             designation:"",
             mobile:"",
             isCreate:false,
             isClicked:false

        }
        this.handleClickOpen=this.handleClickOpen.bind(this)
        this.handleClickOpenSubject=this.handleClickOpenSubject.bind(this)
        this.handleCloseSubject=this.handleCloseSubject.bind(this)
        this.handleClose=this.handleClose.bind(this)
        this.onhandleChange=this.onhandleChange.bind(this)
        this.openCreateForm=this.openCreateForm.bind(this)
        this.submitData=this.submitData.bind(this)
        this.editData=this.editData.bind(this)
        this.handleTrashOpen=this.handleTrashOpen.bind(this)
        this.handleTrashClose = this.handleTrashClose.bind(this)
        this.refreshForm = this.refreshForm.bind(this)
        
    }

    refreshForm(){
      this.componentWillMount();
    }

    componentWillUpdate(){
      this.componentWillMount();
    }
    openCreateForm(){
      this.setState({
        isCreate:true
      })
      this.handleClickOpen();
    }
    onhandleChange(event){
      const name=event.target.name
      const value=event.target.value
      this.setState({
        [name]:value
      })
    }
    submitData(event){
      event.preventDefault()
      this.setState(this.state)
      console.log(this.state)
      axios.post("http://localhost:3300/workers",this.state)
      .then(res=>{
        console.log("Added Worker",res.data)
      })
      .then(this.setState({
        name:"",
        age:"",
        designation:"",
        mobile:"",
      }))
      this.handleClose();
      this.componentWillUpdate();

    }

    async editData(event){
      event.preventDefault();
      this.setState(this.state)
      console.log("Edited Data:",this.state)
      try{
      axios.put("http://localhost:3300/workers/"+data2._id,{
        name:this.state.name===""?data2.name :this.state.name,
        age:this.state.age===""?data2.age:this.state.age,
        designation:this.state.designation===""?data2.designation:this.state.designation,
        mobile:this.state.mobile===""?data2.mobile:this.state.mobile,
      }).then(res=>{
        console.log("Updated Data",res.data)
      }).then(this.setState({
             name:"",
             age:"",
             designation:"",
             mobile:"",
             setOpen:false
      }))
    }catch{
      console.log("Cant Update")
    }
      this.handleClose();
      this.componentWillUpdate();
    }

    deleteData(event){
      event.preventDefault();
      axios.delete("http://localhost:3300/workers/"+data2._id).then(res=>{
        console.log(res.data)
      });
     
     
    }

    
    wrapperDelete(id){
      this.setState({
        isClicked:true
      })
      this.handleTrashOpen();
      this.props.editStudent(id);
    }
    

    handleTrashOpen=()=>{
      this.setState({
        setOpenTrash:true,
        openTrash:true
      })
    }
    handleTrashClose(){
      this.setState({
        setOpenTrash:false,
        openTrash:false
      })
    }

    wrapper(id){
      this.setState({
        isClicked:true
      })
      this.handleClickOpen();
      this.props.editStudent(id);
     
    }


    handleClickOpen = () => {
       this.setState({
           setOpen:true,
           open:true
       })
      };
    
     handleClose = () => {
        this.setState({
          subject:[],
          name:"",
          age:"",
          designation:"",
          mobile:"",
            setOpen:false,
            open:false,
            isCreate:false
        })
      };
      handleClickOpenSubject=()=>{
        this.setState({
          subjectOpen:true,
          setSubjectOpen:true
        })  
      }
      handleCloseSubject=()=> {
        this.setState({
          subjectOpen:false,
          setSubjectOpen:false
        })
      }

      

    componentWillMount(){
        fetch("http://localhost:3300/workers")
        .then(response=>response.json())
        .then((data)=>{
            this.setState({
                Workers:data
            })
        })
        
    }
    
    render() {
      var data = [];
      
      if(this.state.isClicked){
      data=(this.state.Workers.filter((st)=>{
        // console.log("props:",this.props.uid,"row id:",st._id)
       
          return(this.props.sid.toString().search(st._id.toString())!==-1)
      }))
     
      data2=data[0];
      this.setState({isClicked:false})
      console.log('filter data=',data2._id);
    }
        return (
            <div>
                <h1 className="Heading">{this.state.Workers.length} Workers<Fab color="primary" onClick={this.refreshForm} className="addButton"><Refresh /></Fab>
                 <Fab color="primary" onClick={this.openCreateForm} className="addButton"><AddIcon /></Fab></h1>
                <div className="content">

      <Paper style={paper}>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell align="right">S.No</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Designation</TableCell>
            <TableCell align="right">Mobile No.</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {this.state.Workers.map((row,index)=>(
           
            <TableRow key={index}>
              <TableCell component="th" scope="row" align="right">{index+1}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.designation}</TableCell>
              <TableCell align="right">{row.mobile}</TableCell>
              <TableCell align="right"  ><FontAwesomeIcon  icon={faUserEdit} onClick={()=>this.wrapper(row._id)} className="edit"/></TableCell>
              <TableCell align="right" ><FontAwesomeIcon icon={faTrash} onClick={()=>this.wrapperDelete(row._id)} className="trash"/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>






















    <Dialog open={this.state.open} onClose={this.handleClose} className="dialog"
     fullWidth="true"
     maxWidth="lg">
        <DialogTitle id="form-dialog-title">{this.state.isCreate? "Add Worker":"Edit",<span className="edit2"> {data2.name}</span>}</DialogTitle>
        <DialogContent>
          <DialogContentText>
           {this.state.isCreate?" Add Worker Details ":"Edit Worker Details"}
          </DialogContentText>
            <Grid container spacing={3} style={dialog}>
                <Grid item xs={2} >
                <TextField
        id="outlined-email-input"
        label="Name"
        type="text"
        name="name" 
        value={this.state.name}
        onChange={this.onhandleChange}
        margin="normal"
        variant="outlined"
      />
                </Grid>
           
            <Grid item xs={2}>
                <TextField
        id="outlined-email-input"
        label="Age"
        type="text"
        name="age"
        value={this.state.age}
        onChange={this.onhandleChange}
        margin="normal"
        variant="outlined"
      />
                </Grid>
                <Grid item xs={2}>
                <TextField
        id="outlined-email-input"
        label="Designation"
        type="text"
        name="designation"
        value={this.state.designation}
        onChange={this.onhandleChange}
        margin="normal"
        variant="outlined"
      />
                </Grid>
               

                <Grid item xs={2}>
                <TextField
        id="outlined-email-input"
        label="Mobile No"
        type="text"
        name="mobile"
        value={this.state.mobile}
        onChange={this.onhandleChange}
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
          <Button  type="submit" onClick={this.state.isCreate? this.submitData: this.editData} color="primary">
            {this.state.isCreate?"Add Worker" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>






      <Dialog
        open={this.state.openTrash}
        onClose={this.handleTrashClose}
      >
        <DialogTitle id="alert-dialog-title">{"Delete"} <span className="edit2">{data2.name}</span></DialogTitle>
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
