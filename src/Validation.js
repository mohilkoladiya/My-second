import React, { Component } from 'react'

export default class Validation extends Component {
    state={
        name:'',
        nameError:'',
        radio:'',
        radioError:'',
        Country:["Usa","India","Canada","Brazil","Mexico"],
        currentContry:'',
        countryError:'',
        email:'',
        emailError:'',
        dob:'',
        dobError:''
    }
handleName=(e)=>{
    this.setState({
        name:e.target.value,
        nameError:'',
        radioError:'',
        countryError:'',
        emailError:'',
        dobError:''
    })
}
handleRadio=(e)=>{
    this.setState({
        radio:e.target.value,
        radioError:''
    })
}

handleContry=(e)=>{
    this.setState({
        ...this.state,
        currentContry:e.target.value,
        countryError:'',
    })
}
handleEmail=(e)=>{
    this.setState({
        email:e.target.value,
        emailError:''
    })
}
handleDob=(e)=>{
    this.setState({
        dob:e.target.value,
        dobError:''
    })
}
handleSubmit=()=>{
    if(this.state.name === ''){
        this.setState({nameError:"Name is required"})
    }
    else if(this.state.name.length<3){
        this.setState({nameError:"enter atlest 4 character"})
    }
    else if(this.state.radio === ''){
        this.setState({radioError:"please select your gender"})
    }
    else if(this.state.currentContry === ''){
        this.setState({countryError:" please select country"})
    }
    else if(this.state.email === ''){
        this.setState({emailError:"please enter your email"})
    }   
    else if (!/^\w+([-+.'][^\s]\w+)*([-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.state.email)){
        this.setState({emailError:"please enter valied email"})
    }
    else if(this.state.dob === ''){
        this.setState({dobError:"please select you birth date"})
    }
    
}
  
    render() {
        return (
        <>
            <div>
                Name: <input type="text" placeholder="enter your name" onChange={this.handleName}/><br/>
                <p style={{ color: 'red' }}>{this.state.nameError}</p>
                <br/> 

                Gender:
                <input type="radio" value="Male" name="gender" onChange={this.handleRadio}/> Male
                <input type="radio" value="Female" name="gender" onChange={this.handleRadio}/> Female
                <input type="radio" value="Other" name="gender" onChange={this.handleRadio}/> Other
                <p style={{color:'red'}}>{this.state.radioError}</p>
                <br/>              

                Country: <select onChange={this.handleContry}>
                    <option>--- select option ---</option>
                   {
                       this.state.Country.map((item)=>{
                        return <option value={item}>{item}</option>
                       })
                   }
               </select><br/><p style={{ color: 'red' }}>{this.state.countryError}</p>
               <br/>

                Email: <input onChange={this.handleEmail}  type="text" placeholder="Enter your email"/><br/>
                <p style={{ color: 'red' }}>{this.state.emailError}</p>
                <br/>

                Date of birth: <input type="Date" onChange={this.handleDob}/>
                <p style={{color:'red'}}>{this.state.dobError}</p>
               <br/>               
               <br/>               
               <button type="submit" onClick={this.handleSubmit}>Submit</button>
                </div>

        </>
        )
    }
}
