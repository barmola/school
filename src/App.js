import React, { Component } from 'react';
import "typeface-roboto"

import NavBar from "./components/NavBar"
import Login from "./components/Login"
import CreateAccount from "./components/CreateAccount"
import LoginTrue from "./components/LoginTrue"
import Students from "./components/Students/Students"
import Teachers from "./components/Teachers/Teachers"
import Users from "./components/Users/Users"
import Bus from "./components/Buses/Bus"
import Workers from "./components/Workers/Workers"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"


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
       removeLoginTrue:true
    }
    this.showRegisterBox=this.showRegisterBox.bind(this)
    this.showLoginBox=this.showLoginBox.bind(this)
    this.goto=this.goto.bind(this)
   
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
      removeLoginTrue:false
    })
  }

render(){
  
    const  makefalse=()=>{
      if(this.state.isLoggedIn){
        this.setState({
          isLoggedIn:false,
          isRegister:false,
          isNavbarLogin:true,
          isNavbarLogout:true
    })
  }
    console.log("state changed")
}

//<Login regCall={this.showRegisterBox}/>
//<CreateAccount logCall={this.showLoginBox} />
  return (
    <Router>
    <div className="App">
      {this.state.isNavbarLogin &&<NavBar onNavig={this.goto}    />}
      {this.state.isLoggedIn && <Route path="/login" exact strict render={props => <Login regCall = {this.showRegisterBox} />} />}
      {this.state.isRegister && <Route render={props => <CreateAccount logCall = {this.showLoginBox} />} />}
      
  {this.props.test  &&  <div>{makefalse()}{this.state.removeLoginTrue && <LoginTrue />} 
      
      <Route path="/Students" exact component={Students}/>
      <Route path="/Teachers" exact component={Teachers}/>
      <Route path="/Workers" exact component={Workers}/>
      <Route path="/Users" exact component={Users}/>
      <Route path="/Buses" exact component={Bus}/>
      <Route path="/" exact component={Login}/>
      
      
      
      </div> } 
     
     
      </div>      
     
      
    
    </Router>
  );
}
}


