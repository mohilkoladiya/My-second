import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'

function Login1() {
    let history = useHistory();
    const token1 = localStorage.getItem("token1")
    const [login, setLogin] = useState({
        password: '',
        userName: '',
        status: '',
        isLoggin: false
    })

    const inputHandler = (event) => {
        setLogin({
            ...login,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (login.userName === "admin@gmail.com" && login.password === "123" && login.status === "admin") {
            localStorage.setItem("token1", "Admin")
            history.push("/Admin")
        }
        else if (login.userName === "custumer@gmail.com" && login.password === "123" && login.status === "user") {
            localStorage.setItem("token1", "Custumer")
            history.push("/Custumer")
        }
    }

    return (
        <>
            <div>
                <h1>Login Here</h1>
                <form onSubmit={(e) => submitHandler(e)}>
                    Username: <input type="text" placeholder="username"
                        name="userName"
                        // value={login.userName}
                        onChange={(e) => inputHandler(e)} /><br /><br />

                    Password: <input type="password" placeholder="Password"
                        name="password"
                        // value={login.password}
                        onChange={(e) => inputHandler(e)} /><br /><br />

                    Status: <select onChange={(e) => inputHandler(e)} name="status">
                        <option>---Select Your Status---</option>
                        <option value="admin">Admin</option>
                        <option value="user">Cunstomer</option>
                    </select><br /><br />

                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}
export default Login1

