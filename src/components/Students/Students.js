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
export default class Students extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             Students:[],
             Subjects:[],
             setOpen:false,
             open:false,
             subjectOpen:false,
             setSubjectOpen:false,
             setOpenTrash:false,
             openTrash:false,
             subject:[],
             name:"",
             class:"",
             section:"",
             rollno:"",
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
      axios.post("http://localhost:3300/students",this.state)
      .then(res=>{
        console.log("Added Student",res.data)
      })
      .then(this.setState({
        subject:[],
        name:"",
        class:"",
        section:"",
        rollno:"",
      }))
      this.handleClose();
      this.componentWillUpdate();

    }

    async editData(event){
      event.preventDefault();
      this.setState(this.state)
      console.log("Edited Data:",this.state)
      try{
      axios.put("http://localhost:3300/students/"+data2._id,{
        name:this.state.name===""?data2.name :this.state.name,
        class:this.state.class===""?data2.class:this.state.class,
        section:this.state.section===""?data2.section:this.state.section,
        rollno:this.state.rollno===""?data2.rollno:this.state.rollno,
        subject:this.state.subject.length <1 ? data2.subject : this.state.subject
      }).then(res=>{
        console.log("Updated Data",res.data)
      }).then(this.setState({
              subject:[],
             name:"",
             class:"",
             section:"",
             rollno:"",
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
      axios.delete("http://localhost:3300/students/"+data2._id).then(res=>{
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
          class:"",
          section:"",
          rollno:"",
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
        fetch("http://localhost:3300/students")
        .then(response=>response.json())
        .then((data)=>{
            this.setState({
                Students:data
            })
        })
        fetch("http://localhost:3300/subjects")
        .then(response=>response.json())
        .then((data)=>{
          this.setState({
            Subjects:data
          })
        })
    }
    
    render() {
      var data = [];
      
      if(this.state.isClicked){
      data=(this.state.Students.filter((st)=>{
        // console.log("props:",this.props.uid,"row id:",st._id)
       
          return(this.props.sid.toString().search(st._id.toString())!==-1)
      }))
     
      data2=data[0];
      this.setState({isClicked:false})
      console.log('filter data=',data2._id);
    }
        return (
            <div>
                <h1 className="Heading">{this.state.Students.length} Students<Fab color="primary" onClick={this.refreshForm} className="addButton"><Refresh /></Fab>
                 <Fab color="primary" onClick={this.openCreateForm} className="addButton"><AddIcon /></Fab></h1>
                <div className="content">

      <Paper style={paper}>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell align="right">S.No</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Class</TableCell>
            <TableCell align="right">Section</TableCell>
            <TableCell align="right">Roll No</TableCell>
            <TableCell align="right">Subjects</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {this.state.Students.map((row,index)=>(
           
            <TableRow key={index}>
              <TableCell component="th" scope="row" align="right">{index+1}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.class}</TableCell>
              <TableCell align="right">{row.section}</TableCell>
              <TableCell align="right">{row.rollno}</TableCell>
              <TableCell align="right">{row.subject.map((sub,count)=>{
                let subjectLen=row.subject.length
                if(row.subject.length>1 && count<subjectLen-1){ 
                
                  return(sub.concat(', '))
                }
                else{
                
                return (sub);
                }
                })}</TableCell>
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
        <DialogTitle id="form-dialog-title">{this.state.isCreate? "Add Student":"Edit",<span className="edit2"> {data2.name}</span>}</DialogTitle>
        <DialogContent>
          <DialogContentText>
           {this.state.isCreate?" Add User Details ":"Edit User Details"}
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
        label="Class"
        type="text"
        name="class"
        value={this.state.class}
        onChange={this.onhandleChange}
        margin="normal"
        variant="outlined"
      />
                </Grid>
                <Grid item xs={2}>
                <TextField
        id="outlined-email-input"
        label="Section"
        type="text"
        name="section"
        value={this.state.section}
        onChange={this.onhandleChange}
        margin="normal"
        variant="outlined"
      />
                </Grid>
               

                <Grid item xs={2}>
                <TextField
        id="outlined-email-input"
        label="Roll No"
        type="text"
        name="rollno"
        value={this.state.rollno}
        onChange={this.onhandleChange}
        margin="normal"
        variant="outlined"
      />
                </Grid>
               <Grid item xs={2}>
          <FormControl style={formControl}>
          <InputLabel htmlFor="select-multiple">Subjects</InputLabel>
        <Select
          multiple
          open={this.state.subjectOpen}
          onClose={this.handleCloseSubject}
          onOpen={this.handleClickOpenSubject}
          onChange={this.onhandleChange}
          value={this.state.subject}
          input={<Input id="select-multiple"/>}
          name="subject"
        >
          {this.state.Subjects.map((row,index)=>(
          <MenuItem key={index} value={row.subject}>{row.subject}</MenuItem>
          ))}
        </Select>
        </FormControl>
                 </Grid> 
                </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button  type="submit" onClick={this.state.isCreate? this.submitData: this.editData} color="primary">
            {this.state.isCreate?"Add Student" : "Update"}
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
