import React, { Component } from 'react'
import "../css/navbar.css"

export default class NavBar extends Component {
    render() {
        return (
            
                <nav className="navbar">
                    <h3>School Database</h3>
                    <ul>
                        <li>Students</li>
                        <li>Teachers</li>
                        <li>Workers</li>
                        <li>Buses</li>
                    </ul>
                </nav>
           
        )
    }
}
