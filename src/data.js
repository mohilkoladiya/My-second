import React, { Component } from 'react'
import axios from 'axios'
export default class data extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            users:""
        }
    }
    componentDidMount(){
        axios('https://reqres.in/api/users?page=2')
        .then((item)=>{
            this.setState({users:item.data.data})
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.users&&
                    this.state.users.map((item,i)=>{
                    return <div key={item.id}>{item.id}---{item.first_name} {item.last_name}---{item.email}</div>
                    })
                }
            </div>
        )
    }
}
