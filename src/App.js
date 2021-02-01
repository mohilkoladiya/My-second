import React, { Component } from 'react'
import axios from 'axios'
export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      contry:null,
      currentcontry:[],
      dummycontry:[],
      states:null,
      currentstate:[],
      city:[]
    }
  }
  componentDidMount(){
    axios.get('http://localhost:8000/',{
      headers: {
          'Content-Type': 'application/json',
      }
  })
    .then(Response=>{
      this.setState({contry: Response.data}) 
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  componentDidUpdate() {
    if(this.state.currentcontry.length>0){
     axios.post(`http://localhost:8000/${this.state.currentcontry}`)
     .then((Response)=>{
        this.setState({states:Response.data,currentcontry:[]})
     })
     .catch((error)=>{
       console.log(error);
     })
    }
    if(this.state.currentstate.length>0){
     axios.post(`http://localhost:8000/${this.state.dummycontry}/${this.state.currentstate}`)
     .then((Response)=>{
       console.log(Response.data);
       if(Response.data !== ""){
        this.setState({city:Response.data,currentstate:[]})
       }
       else{
        this.setState({city:["No-data"],currentstate:[]})

       }
     })
     .catch((error)=>{
       console.log(error);
     })
    }
  }
  
  
  contryHandle=(e)=>{
    this.setState({
      currentcontry: e.target.value,
      dummycontry:e.target.value,
      city:null  
    })
  }
  stateHandler=(e)=>{
    this.setState({
      currentstate:e.target.value
    })
    
  }
  
  
  render() {
    return (
      <>
      <div>
        <select onChange={this.contryHandle}>
              {
                (this.state.contry &&
                  this.state.contry.map(desh =>{
                return <option key={desh.code} value={desh.code}>{desh.name}</option>
                })
                )}
        </select>
        <select onChange={this.stateHandler}>
              {(this.state.states &&
                this.state.states.map(data =>{
                return <option key={data} value={data}>{data}</option>
                })
              )}
        </select>
        <select >
          {/* <option value=" "> Select Cit y</option> */}
          {(this.state.city &&
            this.state.city.map((item)=>{
            return(
              <option key={item} value={item}>{item}</option>
            )
          })
            )}
        </select>

      </div>
      </>
    )
  }
}
