import React, { Component } from 'react'
import {Paper,Container} from '@material-ui/core'
import "./css/Dashboard.css"
import {Link} from "react-router-dom"

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             Students:[],
             Workers:[],
             Teachers:[],
             Buses:[]
        }

    }
    componentDidMount(){
        fetch("http://localhost:3300/students")
        .then(response=>response.json())
        .then((data)=>{
            this.setState({
                Students:data
            })
        })
        fetch("http://localhost:3300/workers")
        .then(response=>response.json())
        .then((data)=>{
          this.setState({
            Workers:data
          })
        })
        fetch("http://localhost:3300/teacher")
        .then(response=>response.json())
        .then((data)=>{
          this.setState({
            Teachers:data
          })
        })
        fetch("http://localhost:3300/buses")
        .then(response=>response.json())
        .then((data)=>{
          this.setState({
            Buses:data
          })
        })
    }
    
    render() {
        return (
            <div>
                <Container>
                    <div className="dashboard">
                        <Link exact to="/Students" onClick={this.props.onNavig} className="navStyle">
                        <Paper className="paper3">
                            <div>
                                <div className="icon">
                                <p className="total">{this.state.Students.length}</p>
                                <img src={require("./images/student.png")} className="student" />
                                </div>
                                <p className="title">Students</p>
                            </div>
                        </Paper>
                        </Link>
                        <Link exact to="/Teachers" onClick={this.props.onNavig} className="navStyle">
                        <Paper className="paper3">
                            <div>
                                <div className="icon">
                                <p className="total">{this.state.Teachers.length}</p>
                                <img src={require("./images/Teacher.png")} className="student" />
                                </div>
                                <p className="title">Teachers</p>
                            </div>
                        </Paper>
                        </Link>
                    </div>
                    <div className="dashboard">
                    <Link exact to="/Workers" onClick={this.props.onNavig} className="navStyle">
                        <Paper className="paper3">
                            <div>
                                <div className="icon">
                                <p className="total">{this.state.Workers.length}</p>
                                <img src={require("./images/Worker.png")} className="student" />
                                </div>
                                <p className="title">Workers</p>
                            </div>
                        </Paper>
                        </Link>
                        <Link exact to="/Buses" onClick={this.props.onNavig} className="navStyle">
                        <Paper className="paper3">
                            <div>
                                <div className="icon2">
                                <p className="total">{this.state.Buses.length}</p>
                                <img src={require("./images/Bus.png")} className="bus" />

                                </div>
                                <p className="title2">Buses</p>
                            </div>
                        </Paper>
                        </Link>
                    </div>
                </Container>
            </div>
        )
    }
}
