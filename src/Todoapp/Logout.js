import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Logout extends Component {
    constructor(props){
        super(props)
         localStorage.removeItem("token")   
    }
    render() {
        return (
            <div align="center" style={{marginTop:"200px",}}>
                <h1 style={{color:'black'}}>You have been logout</h1>
                <br/>
                <Link to="/" className="btn btn-info">Login Again</Link>
            </div>
        )
    }
}
