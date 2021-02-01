import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import "./Task.css"

export default class Login extends Component {
    constructor(props) {
        super(props);

        const token = localStorage.getItem("token")
        let isloggIn = true
        if (token == null) {
            isloggIn = false
    
                    }
        this.state = {
            isloggIn: false,
            userName: '',
            password: '',
            userError: '',
            passwordError: ''
        }
    }
    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            userError:'',
            passwordError:''
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { userName, password } = this.state
        if (userName === '') {
            this.setState({
                userError: "Please enter user name"
            })
        }
        else if (!/^\w+([-+.'][^\s]\w+)*([-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.state.userName)){
            this.setState({
                ...this.state,
                userError:"Please enter valied username"
            })
        }
        else if(password === ''){
            this.setState({
                passwordError:"Please enter your password"
            })
        }
        else if(password !== "admin123"){
            this.setState({
                passwordError:"Please enter valied password"
            })
        }
        else{
            if (userName === "admin@gmail.com" && password === "admin123") {
                localStorage.setItem("token", "hjasagdfaqdqw")
                this.setState({
                    isloggIn: !this.state.isloggIn
                })
            }
        }
    }

    render() {
        if (this.state.isloggIn) {
            return <Redirect to="/task" />
        }
        return (
            <>
                <div align="center" className="box">
                    <h1 className="text-center">Login Here</h1>
                    <form onSubmit={this.handleSubmit} className="form">

                        <input type="text" placeholder="Username"
                            className="input-container"
                            name="userName"
                            value={this.state.userName}
                            onChange={this.handleInput} />
                            <p style={{color:'red'}}>{this.state.userError}</p>

                        <input type="password" placeholder="password"
                            className="input-container"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInput}/>
                            <p style={{color:'red'}}>{this.state.passwordError}</p>``

                        <button type="submit" className="login">Login</button>
                    </form>
                </div>
            </>
        )
    }
}
