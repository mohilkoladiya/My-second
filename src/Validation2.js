import React, { Component } from 'react'

export default class  extends Component {
    state={
        list:[],
        feild:{
            name:'',
            gender:'',
            city:'',
            email:'',
            dob:'',
            password:''
        },
        fieldError:{
            nameError:'',
            genderError:'',
            cityError:'',
            emailError:'',
            dobError:'',
            pwdError:''
        }
    }
    handleInput=(e)=>{
        this.setState({
            ...this.state,
            feild:{
                ...this.state.feild,
                [e.target.name]:e.target.value
            },
            fieldError:{
                nameError:'',
                genderError:'',
                cityError:'',
                emailError:'',
                dobError:'',
                pwdError:''                
            }
        })
    }
    formValidation=(e)=>{
        const {name,gender} = this.state.feild
        console.log(name);
        e.preventDefault();
        if(this.state.feild.name === ''){
            this.setState({
                fieldError:{...this.state.fieldError,
                    nameError:"please enter your name"
                }
            })
        }
        else if(this.state.feild.name.length<3){
            this.setState({
               fieldError:{ nameError:"enter atleast 3 or more character"}
            })
        }
        else if(this.state.feild.gender === ''){
            this.setState({
                fieldError:{genderError:"please select your  gender"}
            })
        }
        else if(this.state.feild.city === ''){
            this.setState({
                fieldError:{cityError:"plase select your city"}
            })
        }
        else if(this.state.feild.email === ''){
            this.setState({
                fieldError:{emailError:"please enter your email"}
            })
        }
        else if(!/^\w+([-+.'][^\s]\w+)*([-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.state.feild.email)){
            this.setState({
                fieldError:{emailError:"enter valied email"}
            })
        }
        else if(this.state.feild.dob === ''){
            this.setState({
                fieldError:{dobError:"select you dob"}
            })
        }
        else if(this.state.feild.password === ''){
            this.setState({
                fieldError:{pwdError:"please enter your password"}  
            })
        }
        else if(this.state.feild.password.length<6){
            this.setState({
                fieldError:({pwdError:"enter password atleast 6 character"})
            })
        }
        else{
            this.setState({       
                list:[...this.state.list,this.state.feild]
            })
        }
    }
    render() {
        return (
           <>
                <div>
                    <form onSubmit={this.formValidation}>

                        Name: <input type="text" value={this.state.name} 
                                    onChange={this.handleInput} name="name"/>
                                    <p style={{color:'red'}}>{this.state.fieldError.nameError}</p>
                        
                        Gender:<input type="radio" value="male" name="gender" onChange={this.handleInput}/>Male                   
                               <input type="radio" value="female"name="gender" onChange={this.handleInput}/>Female                   
                               <p style={{color:'red'}}>{this.state.fieldError.genderError}</p>
                                       
                        City:<input type="text" name="city" onChange={this.handleInput}/>
                            <p style={{color:'red'}}>{this.state.fieldError.cityError}</p>
                        
                        Email: <input type="text" onChange={this.handleInput}
                                 value={this.state.email} name="email"/>
                                 <p style={{color:'red'}}>{this.state.fieldError.emailError}</p>
                         
                        Date of birth: <input type="Date" name="dob" onChange={this.handleInput }/>
                                <p style={{color:'red'}}>{this.state.fieldError.dobError}</p> 

                        Password: <input type="password" name="password"  onChange={this.handleInput}/>
                                  <input type="checkbox"/>Show password
                                <p style={{color:'red'}}>{this.state.fieldError.pwdError}</p>
                        <br/>         
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <br/>
                <div>
                    <table border="1px:solid:black">
                        <thead>
                        <tr>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>City</th>
                            <th>Email</th>
                            <th>DOB</th>
                            <th>Password</th>
                        </tr>
                        </thead>

                        {
                            this.state.list.map((item)=>{
                                return (
                                <>
                                <tr>
                                        <td>{item.gender==="male" ? "Mr."  :"Mrs." }</td>
                                        <td>{item.name}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.city}</td>
                                        <td>{item.email}</td>
                                        <td>{item.dob}</td>
                                        <td>{item.password}</td>
                                    
                                </tr>
                                </>
                                )
                            })
                        }
                    </table>
                </div>
           </>
        )
    }
}