import React, { Component } from 'react'
import "../css/navbar.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faUserTie,faSchool,faUserGraduate,faUserAstronaut,faBus,faUser,faPowerOff} from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom"
import App from '../App'


export default class NavBar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           
        }
       
    }
 
    
    render() {
       
        return (
            
                <nav className="navbar">
                    <h3><FontAwesomeIcon icon={faSchool}/>  School Database</h3>
                    <ul className="navbar_ul">
                        <Link className="navStyle" exact to="/Students" onClick={this.props.onNavig}>
                        <li ><FontAwesomeIcon icon={faUserTie}/>  Students</li>
                        </Link>
                        <Link className="navStyle" exact to="/Teachers" onClick={this.props.onNavigTeacher}>
                        <li><FontAwesomeIcon icon={faUserGraduate}/>  Teachers</li>
                        </Link>
                        <Link className="navStyle" exact to="/Workers" onClick={this.props.onNavigWorker}>
                        <li><FontAwesomeIcon icon={faUserAstronaut}/>  Workers</li>
                        </Link>
                        <Link className="navStyle" exact to="/Buses" onClick={this.props.onNavigBus}>
                        <li><FontAwesomeIcon icon={faBus}/>Buses  </li>
                        </Link>
                        <Link className="navStyle" exact to="/Users" onClick={this.props.onNavigUser}>
                        <li><FontAwesomeIcon icon={faUser}/>Users  </li>
                        </Link>
                        <Link className="navStyle" exact to="/Login" >
                        <li><FontAwesomeIcon icon={faPowerOff}/> </li>
                        </Link>
                    </ul>
                </nav>
           
        )
    }
}
