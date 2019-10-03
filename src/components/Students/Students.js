import React, { Component } from 'react'
import "../Students/students.css"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper,Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Grid,Select,InputLabel,MenuItem,Input,FormControl,TablePagination} from '@material-ui/core';
import {faUserEdit,faTrash} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Refresh from "@material-ui/icons/Refresh"
import axios from "axios"




  const paper={
    width:"1000px",
    marginBottom:"50px"
    
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
             open:false,
             subjectOpen:false,
             openTrash:false,
             subject:[],
             Search:"",
             name:"",
             class:"",
             section:"",
             rollno:"",
             isCreate:false,
             isClicked:false,
             page:0,
             rowsPerPage:5,
             

        }
  // -------------------------------------------Binding All Functions Before Calling them----------------------------------      

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
        this.handleChangePage=this.handleChangePage.bind(this);
        this.handleChangeRowsPage = this.handleChangeRowsPage.bind(this);
        
    }




    updateSearch(event){    //Search Function
      
      this.setState({Search:event.target.value.substr(0,20)});
      
    }

    handleChangePage=(event,newPage)=>{  //To change the page of Table
      this.setState({
        page:newPage
      })
    }
    handleChangeRowsPage=event=>{ //To set the no. of rows to be displayed in table
      this.setState({
        rowsPerPage: event.target.value,
        page:0
      })
  
    }

    refreshForm(){        //To refresh the API
      this.componentWillMount();
    }

    componentWillUpdate(){
      this.componentWillMount();
      
    }
    openCreateForm(){  //To open the same form for Adding New students
      this.setState({
        isCreate:true
      })
      this.handleClickOpen();
    }
    onhandleChange(event){    // To store the values of Input Data field
      const name=event.target.name
      const value=event.target.value
      this.setState({
        [name]:value
      })
    }
    submitData(event){    //To submit the data to the Database
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
      this.refreshForm();

    }

    async editData(event){    //To to edit the specific field of the Data in Database
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
             open:false
      }))
    }catch{
      console.log("Cant Update")
    }
      this.handleClose();
      this.refreshForm();
    }

    deleteData(event){      //To delete the Data from Database
      event.preventDefault();
      axios.delete("http://localhost:3300/students/"+data2._id).then(res=>{
        console.log(res.data)
      });
     
     
    }

    
    wrapperDelete(id){      //To delete the specific data from Database
      this.setState({
        isClicked:true
      })
      this.handleTrashOpen();
      this.props.editStudent(id);
    }
    

    handleTrashOpen=()=>{   // To open the Delete Dialog Box 
      this.setState({
        openTrash:true
      })
    }
    handleTrashClose(){
      this.setState({
        openTrash:false
      })
    }

    wrapper(id){  //To open form by Clicking on Edit Icon
      this.setState({
        isClicked:true
      })
      this.handleClickOpen();
      this.props.editStudent(id);
     
    }


    handleClickOpen = () => { // To open Form
       this.setState({
           open:true
       })
      };
    
     handleClose = () => { // To Close the FORM
        this.setState({
          subject:[],
          name:"",
          class:"",
          section:"",
          rollno:"",
            open:false,
            isCreate:false
        })
      };
      handleClickOpenSubject=()=>{ //To open the Select Box of Subjects
        this.setState({
          subjectOpen:true,
        })  
      }
      handleCloseSubject=()=> { // To close the Select Box of Subjects
        this.setState({
          subjectOpen:false,
        })
      }

      

    componentWillMount(){   // This state will mount or re render after every change in States
        fetch("http://localhost:3300/students")   // To fetch the details of Students from Database
        .then(response=>response.json())
        .then((data)=>{
            this.setState({
                Students:data
            })
        })
        fetch("http://localhost:3300/subjects") //To fetch the details of Subjects from Database
        .then(response=>response.json())
        .then((data)=>{
          this.setState({
            Subjects:data
          })
        })
    }
    
    render() {
      var data = [];
      
      if(this.state.isClicked){       // To get the Row Id of specific Student on CLicking on Edit or Delete Button
      data=(this.state.Students.filter((st)=>{
        // console.log("props:",this.props.uid,"row id:",st._id)
       
          return(this.props.sid.toString().search(st._id.toString())!==-1)
      }))
     
      data2=data[0];
      this.setState({isClicked:false})
      console.log('filter data=',data2._id);
    }
    let Students2 =  this.state.Students.filter((student)=>{        // To Search the Student from Database
      return student.name.toLowerCase().indexOf(this.state.Search) !==-1||
      student.class.indexOf(this.state.Search) !==-1 ||
      student.section.toLowerCase().indexOf(this.state.Search) !==-1 ||
      student.rollno.toString().search(this.state.Search) !==-1;

     
    })
        return (
            <div>
                <h1 className="Heading">{this.state.Students.length} Students<Fab color="primary" onClick={this.refreshForm} className="addButton"><Refresh /></Fab>
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
{/* -----------------------------------------------------Table----------------------------------------------------- */}
      <Table stickyHeader >
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

        {Students2.map((row,index)=>(

            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
      <TablePagination
        rowsPerPageOptions={[5,10, 25, 100]}
        component="div"
        count={this.state.Students.length}
        rowsPerPage={this.state.rowsPerPage}
        page={this.state.page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
      />
    </Paper>




















{/* ----------------------------------------------Adding or Editing Dialog Box------------------------------------------------------ */}

    <Dialog open={this.state.open} onClose={this.handleClose} className="dialog"      // Edit or Add Dialog Box
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




{/* ----------------------------------------------------------Delete Dialog Box----------------------------------- */}

      <Dialog         // Delete Dialog Box 
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
