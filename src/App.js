import React, { Component } from 'react';
import "typeface-roboto"
import "./App.css"
import NavBar from "./components/NavBar"
import Login from "./components/Login"
import CreateAccount from "./components/CreateAccount"
import LoginTrue from "./components/LoginTrue"
import Students from "./components/Students/Students"
import Teachers from "./components/Teachers/Teachers"
import Users from "./components/Users/Users"
import Bus from "./components/Buses/Bus"
import Workers from "./components/Workers/Workers"
import Dashboard from "./Dashboard"
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom"


export default class App extends Component{
  constructor(props) {
    super(props)
  
    this.state = {
       isLoggedIn:true,
       isRegister:false,
       isNavbarLogin:false,
       isNavbarLogout:true,
       gotoStudent:false,
       gotoTeacher:false,
       gotoWorkers:false,
       gotoUsers:false,
       removeLoginTrue:true,
       uID:"",
       sID:""
    }
    this.showRegisterBox=this.showRegisterBox.bind(this)
    this.showLoginBox=this.showLoginBox.bind(this)
    this.goto=this.goto.bind(this)
    this.editUser=this.editUser.bind(this)
   
  //  this.makefalse=this.makefalse.bind(this)
  }

  showRegisterBox(){ //Open Register Box
    this.setState({
      isLoggedIn:false,
      isRegister:true,
      isNavbar:true
    })
  }
  
  showLoginBox(){  //Open Login Box
    this.setState({
      isLoggedIn:true,
      isRegister:false,
      isNavbar:true
    })
  }
  goto(){       //Go to Student Tab
    this.setState({
      gotoStudent:true,
      removeLoginTrue:true
    })
  }


  editUser=userID=>{
    this.setState({
      uID:userID
    })
      }
  editStudent=studentID=>{
    this.setState({
      sID:studentID
    })
  }
    

render(){
  
    const  makefalse=()=>{
      if(this.state.isLoggedIn){
        this.setState({
          isLoggedIn:false,
          isRegister:false,
          isNavbarLogin:true,
          isNavbarLogout:true,
          removeLoginTrue:false
          
    })
  }
    
}

//<Login regCall={this.showRegisterBox}/>
//<CreateAccount logCall={this.showLoginBox} />
  return (
    
    <Router>
          
        
    <div className="App">
      {this.state.isNavbarLogin &&<NavBar onNavig={this.goto}    />}
      {this.state.isLoggedIn && <Route path="/login" exact strict render={props => <Login regCall = {this.showRegisterBox} />} />}
      {this.state.isRegister && <Route render={props => <CreateAccount logCall = {this.showLoginBox} />} />}
      
  {this.props.test  &&  <div>{makefalse()}{this.state.removeLoginTrue && <Route exact path="/dashboard" render={props => <Dashboard onNavig={this.goto}/>}  />}
      
  <Route path="/Students" exact render={props=><Students editStudent={this.editStudent} sid={this.state.sID}/>} />
      <Route path="/Teachers" exact render={props=><Teachers editStudent={this.editStudent} sid={this.state.sID}/>}/>
      <Route path="/Workers" exact render={props=><Workers editStudent={this.editStudent} sid={this.state.sID}/>}/>
      <Route path="/Users" exact render={props=><Users editUser={this.editUser} uid={this.state.uID}/>} />
      <Route path="/Buses" exact render={props=><Bus editStudent={this.editStudent} sid={this.state.sID}/>}/>
      <Route path="/" exact component={Login}/>
      
      
      
      </div> } 
     
     
      </div>      
     
      
    
    </Router>
  );
}
}


