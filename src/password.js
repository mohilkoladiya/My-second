import React, { Component } from 'react'

export default class password extends Component {
    state={
        password:'',
        pwdError:'',
        show:false
    }

    handlePassword=(e)=>{
       this.setState({
           password:e.target.value,
           pwdError:''
        })     
    }
    handleButton=()=>{
        if(this.state.password === ''){
            this.setState({pwdError:"enter your passwword"})
        }
        else if(this.state.password.length<6){
            this.setState({pwdError:"password must be atleast 6 character"})
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(this.state.password)) {
            this.setState({
               pwdError:"password is poor"
                })
            }
        }
        showPassword =() =>{
            this.setState({
                show: !this.state.show
            })
        }

    render() {
        return (
            <>
            <div>
               Password: <input type={this.state.show? "text" : "password"} onChange={this.handlePassword}/>
                        <input type="checkbox" onChange={this.showPassword} />Show password
                <p style={{color:'red'}}>{this.state.pwdError}</p> 

               <button type="submit" onClick={this.handleButton}>Submit</button>
            </div>
            </>
        )
    }
}
