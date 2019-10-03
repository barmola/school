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
export default class Bus extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
                Buses:[],
                Workers:[],
             open:false,
             driverOpen:false,
             conductorOpen:false,
             openTrash:false,
             bno:"",
             to:"",
             driver:"",
             conductor:"",
             number:"",
             isCreate:false,
             isClicked:false

        }
        this.handleClickOpen=this.handleClickOpen.bind(this)
        this.handleClickOpenDriver=this.handleClickOpenDriver.bind(this)
        this.handleClickOpenConductor=this.handleClickOpenConductor.bind(this)
        
        this.handleCloseConductor=this.handleCloseConductor.bind(this)
        this.handleCloseDriver=this.handleCloseDriver.bind(this)
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
      axios.post("http://localhost:3300/buses",this.state)
      .then(res=>{
        console.log("Added Bus",res.data)
      })
      .then(this.setState({
        bno:"",
        to:"",
        driver:"",
        conductor:"",
        number:""
      }))
      this.handleClose();
      this.componentWillUpdate();

    }

    async editData(event){
      event.preventDefault();
      this.setState(this.state)
      console.log("Edited Data:",this.state)
      try{
      axios.put("http://localhost:3300/buses/"+data2._id,{
        bno:this.state.bno===""?data2.bno :this.state.bno,
        to:this.state.to===""?data2.to:this.state.to,
        driver:this.state.driver===""?data2.driver:this.state.driver,
        number:this.state.number===""?data2.number:this.state.number,
        conductor:this.state.conductor===""?data2.conductor:this.state.conductor,
      }).then(res=>{
        console.log("Updated Data",res.data)
      }).then(this.setState({
             bno:"",
             to:"",
             driver:"",
             conductor:"",
             number:"",
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
      axios.delete("http://localhost:3300/buses/"+data2._id).then(res=>{
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
         
          bno:"",
          to:"",
          driver:"",
          conductor:"",
          number:"",
            open:false,
            isCreate:false
        })
      };
      handleClickOpenDriver=()=>{
        this.setState({
          driverOpen:true,
        })  
      }
      handleClickOpenConductor=()=>{
        this.setState({
          conductorOpen:true,
        })  
      }
      handleCloseDriver=()=> {
        this.setState({
          driverOpen:false,
        })
      }
      handleCloseConductor=()=> {
        this.setState({
          conductorOpen:false,
        })
      }

      

    componentWillMount(){
        fetch("http://localhost:3300/buses")
        .then(response=>response.json())
        .then((data)=>{
            this.setState({
                Buses:data
            })
        })
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
      data=(this.state.Buses.filter((st)=>{
        // console.log("props:",this.props.uid,"row id:",st._id)
       
          return(this.props.sid.toString().search(st._id.toString())!==-1)
      }))
     
      data2=data[0];
      this.setState({isClicked:false})
      console.log('filter data=',data2._id);
    }
        return (
            <div>
                <h1 className="Heading">{this.state.Buses.length} Buses<Fab color="primary" onClick={this.refreshForm} className="addButton"><Refresh /></Fab>
                 <Fab color="primary" onClick={this.openCreateForm} className="addButton"><AddIcon /></Fab></h1>
                <div className="content">

      <Paper style={paper}>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell align="right">S.No</TableCell>
            <TableCell align="right">Bus No</TableCell>
            <TableCell align="right">To</TableCell>
            <TableCell align="right">Driver</TableCell>
            <TableCell align="right">Conductor</TableCell>
            <TableCell align="right">Number</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {this.state.Buses.map((row,index)=>(
           
            <TableRow key={index}>
              <TableCell component="th" scope="row" align="right">{index+1}</TableCell>
              <TableCell align="right">{row.bno}</TableCell>
              <TableCell align="right">{row.to}</TableCell>
              <TableCell align="right">{row.driver}</TableCell>
              <TableCell align="right">{row.conductor}</TableCell>
              <TableCell align="right">{row.number}</TableCell>
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
        <DialogTitle id="form-dialog-title">{this.state.isCreate? "Add Bus": <span className="edit2">Edit{data2.bno}</span>}</DialogTitle>
        <DialogContent>
          <DialogContentText>
           {this.state.isCreate?" Add Bus Details ":"Edit Bus Details"}
          </DialogContentText>
            <Grid container spacing={3} style={dialog}>
                <Grid item xs={2} >
                <TextField
        id="outlined-email-input"
        label="Bus No"
        type="text"
        name="bno" 
        value={this.state.bno}
        onChange={this.onhandleChange}
        margin="normal"
        variant="outlined"
      />
                </Grid>
           
            <Grid item xs={2}>
                <TextField
        id="outlined-email-input"
        label="To"
        type="text"
        name="to"
        value={this.state.to}
        onChange={this.onhandleChange}
        margin="normal"
        variant="outlined"
      />
                </Grid>
                <Grid item xs={2}>
                <FormControl style={formControl}>
          <InputLabel htmlFor="select-multiple">Driver</InputLabel>
        <Select
          open={this.state.driverOpen}
          onClose={this.handleCloseDriver}
          onOpen={this.handleClickOpenDriver}
          onChange={this.onhandleChange}
          value={this.state.driver}
          input={<Input id="select-multiple"/>}
          name="driver"
        >
          {this.state.Workers.map((row,index)=>(
          <MenuItem key={index} value={row.name}>{row.name}</MenuItem>
          ))}
        </Select>
        </FormControl>
                </Grid>
               

                <Grid item xs={2}>
                <FormControl style={formControl}>
          <InputLabel htmlFor="select-multiple">Conductor</InputLabel>
        <Select
          open={this.state.conductorOpen}
          onClose={this.handleCloseConductor}
          onOpen={this.handleClickOpenConductor}
          onChange={this.onhandleChange}
          value={this.state.conductor}
          input={<Input id="select-multiple"/>}
          name="conductor"
        >
          {this.state.Workers.map((row,index)=>(
          <MenuItem key={index} value={row.name}>{row.name}</MenuItem>
          ))}
        </Select>
        </FormControl>
                </Grid>

                <Grid item xs={2}>
                <TextField
        id="outlined-email-input"
        label="Number"
        type="text"
        name="number"
        value={this.state.number}
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
            {this.state.isCreate?"Add Bus" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>






      <Dialog
        open={this.state.openTrash}
        onClose={this.handleTrashClose}
      >
        <DialogTitle id="alert-dialog-title">{"Delete"} <span className="edit2">{data2.bno}</span></DialogTitle>
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
