import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function Logout1() {
    localStorage.removeItem("token1")
    let history = useHistory()
    const loginHandler=()=>{
        history.push("/")
    }
    return (
        <div align="center">
            <h1>You are logged out</h1><br/>
            <Button onClick={()=>{loginHandler()}}>Login Again</Button>
        </div>
    )
}

export default Logout1
