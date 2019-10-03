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
export default class Teachers extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             Teachers:[],
             Subjects:[],
             open:false,
             subjectOpen:false,
             openTrash:false,
             name:"",
             subject:"",
             class:[],
             isCreate:false,
             isClicked:false,
             Search:""

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
        this.updateSearch=this.updateSearch.bind(this)

        
    }




    
    updateSearch(event){    //Search Function
      
      this.setState({Search:event.target.value.substr(0,20)});
      
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
      axios.post("http://localhost:3300/teacher",this.state)
      .then(res=>{
        console.log("Added Teacher",res.data)
      })
      .then(this.setState({
        name:"",
        subject:"",
        class:[],
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
      axios.put("http://localhost:3300/teacher/"+data2._id,{
        name:this.state.name===""?data2.name :this.state.name,
        subject:this.state.subject==="" ? data2.subject : this.state.subject,
        class:this.state.class.length <1 ? data2.class : this.state.class
      }).then(res=>{
        console.log("Updated Data",res.data)
      }).then(this.setState({
             name:"",
             subject:"",
             class:[],
             open:false
      }))
    }catch{
      console.log("Cant Update")
    }
      this.handleClose();
      this.componentWillUpdate();
    }

    deleteData(event){
      event.preventDefault();
      axios.delete("http://localhost:3300/teacher/"+data2._id).then(res=>{
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
        openTrash:true
      })
    }
    handleTrashClose(){
      this.setState({
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
           open:true
       })
      };
    
     handleClose = () => {
        this.setState({
          
          name:"",
          subject:"",
          class:[],
            open:false,
            isCreate:false
        })
      };
      handleClickOpenSubject=()=>{
        this.setState({
          subjectOpen:true,
        })  
      }
      handleCloseSubject=()=> {
        this.setState({
          subjectOpen:false,
        })
      }

      

    componentWillMount(){
        fetch("http://localhost:3300/teacher")
        .then(response=>response.json())
        .then((data)=>{
            this.setState({
                Teachers:data
            })
        })
        
    }
    
    render() {
      var data = [];
      
      if(this.state.isClicked){
      data=(this.state.Teachers.filter((st)=>{
        // console.log("props:",this.props.uid,"row id:",st._id)
       
          return(this.props.sid.toString().search(st._id.toString())!==-1)
      }))
     
      data2=data[0];
      this.setState({isClicked:false})
      console.log('filter data=',data2._id);
    }

    let Teachers2 =  this.state.Teachers.filter((student)=>{        // To Search the Student from Database
      return student.name.toLowerCase().indexOf(this.state.Search) !==-1||
      student.subject.toLowerCase().indexOf(this.state.Search) !==-1 ;
    })
        return (
            <div>
                <h1 className="Heading">{this.state.Teachers.length} Teachers<Fab color="primary" onClick={this.refreshForm} className="addButton"><Refresh /></Fab>
                 <Fab color="primary" onClick={this.openCreateForm} className="addButton"><AddIcon /></Fab></h1>
                <div className="content">

      <Paper style={paper}>
      <TextField  
       id="adornment-weight"
      label="Search Anything"
      className="search"
      name="search"
      value={this.state.Search}
      onChange={this.updateSearch}
      />
      <Table >
        <TableHead>
          <TableRow>
            <TableCell align="right">S.No</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Subject</TableCell>
            <TableCell align="right">Class</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {Teachers2.map((row,index)=>(
           
            <TableRow key={index}>
              <TableCell component="th" scope="row" align="right">{index+1}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.subject}</TableCell>
              <TableCell align="right">{row.class.map((sub,count)=>{
                let classLen=row.class.length
                if(row.class.length>1 && count<classLen-1){ 
                
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
     fullWidth={true}
     maxWidth="lg">
        <DialogTitle id="form-dialog-title">{this.state.isCreate? "Add Teacher":<span className="edit2">{data2.name}</span>}</DialogTitle>
        <DialogContent>
          <DialogContentText>
           {this.state.isCreate?" Add Teacher Details ":"Edit Teacher Details"}
          </DialogContentText>
            <Grid container spacing={3} style={dialog}>
                <Grid item xs={2} >
               {!this.state.isCreate && <InputLabel htmlFor="select-multiple">Name</InputLabel>}
                <TextField
        id="outlined-email-input"
        label={this.state.isCreate?"Name":data2.name}
        type="text"
        name="name" 
        value={this.state.name}
        onChange={this.onhandleChange}
        margin="normal"
        variant="outlined"
      />
                </Grid>
           
            <Grid item xs={2}>
            {!this.state.isCreate && <InputLabel htmlFor="select-multiple">Subject</InputLabel>}

                <TextField
        id="outlined-email-input"
        label={this.state.isCreate?"Subject":data2.subject}
        type="text"
        name="subject"
        value={this.state.subject}
        onChange={this.onhandleChange}
        margin="normal"
        variant="outlined"
      />
                </Grid>
                <Grid item xs={2}>
                <FormControl style={formControl}>
          <InputLabel htmlFor="select-multiple">Classes</InputLabel>
        <Select
          multiple
          open={this.state.subjectOpen}
          onClose={this.handleCloseSubject}
          onOpen={this.handleClickOpenSubject}
          onChange={this.onhandleChange}
          value={this.state.class}
          input={<Input id="select-multiple"/>}
          name="class"
        >
          <MenuItem  value="12th">12th</MenuItem>
          <MenuItem  value="11th">11th</MenuItem>
          <MenuItem  value="10th">10th</MenuItem>
          <MenuItem  value="9th">9th</MenuItem>
          <MenuItem  value="8th">8th</MenuItem>
          <MenuItem  value="7th">7th</MenuItem>
          <MenuItem  value="6th">6th</MenuItem>
          <MenuItem  value="5th">5th</MenuItem>
          <MenuItem  value="4th">4th</MenuItem>
          <MenuItem  value="3rd">3rd</MenuItem>
          <MenuItem  value="2nd">3nd</MenuItem>
          <MenuItem  value="1st">1st</MenuItem>
          <MenuItem  value="UKG">UKG</MenuItem>
          <MenuItem  value="LKG">LKG</MenuItem>
        
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
            {this.state.isCreate?"Add Teacher" : "Update"}
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
