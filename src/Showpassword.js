import React, { useState } from 'react'
import Eyelogo from './image/eyelogo.png'

export default function Taska() {
    const [state, setState] = useState({
        show: false,
        contact: '',
        email: '',
        list: [],
        data: ["India", "USA", "Canada", "Japan", "Jermany", "Australiya"],
        country: '',
        countryList: [],
        firstNumber: '',
        secondNumber: '',
        numberMethod: '',
        output: ''
    })
    const showPassword = () => {
        setState({
            ...state,
            show: !state.show
        })
    }
    const contactHandler = (event) => {
        if (state.contact.length < 10) {
            setState({
                ...state,
                contact: event.target.value
            })
        }
    }
    const emailHandler = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }
    const buttonHandler = (event) => {
        if (state.email === '') {
            alert("Email is required")
        }
        else if (!/^\w+([-+.'][^\s]\w+)*([-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(state.email)) {
            alert("Please enter a valied email")
        }
        else {
            if (state.list.includes(state.email)) {
                alert("Email already exist")
            } else {
                setState({
                    ...state,
                    list: [...state.list, state.email],
                    email: ''
                })
            }
        }
    }
    const selectHandler = (event) => {
        setState({
            ...state,
            country: event.target.value
        })
    }
    const countryHandler = () => {
        setState({
            ...state,
            countryList: [...state.countryList, state.country]
        })
    }
    const numberHandler = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }
    const methodHandler = (event) => {
        setState({
            ...state,
            numberMethod: event.target.value
        })
    }
    const pressHandler = () => {
        if (state.numberMethod == "sum") {
            const output = parseInt(state.firstNumber) + parseInt(state.secondNumber)
            setState({
                ...state, output
            })
        }
        if (state.numberMethod == "sub") {
            const output = parseInt(state.firstNumber) - parseInt(state.secondNumber)
            setState({
                ...state, output
            })
        }
        if (state.numberMethod == "mul") {
            const output = parseInt(state.firstNumber) * parseInt(state.secondNumber)
            setState({
                ...state, output
            })
        }
        if (state.numberMethod == "div") {
            const output = parseInt(state.firstNumber) / parseInt(state.secondNumber)
            setState({
                ...state, output
            })
        }
    }
    return (
        <div>
            <h1>password Task</h1>
           password: <input type="password" type={state.show ? "text" : "password"} />
           <img src={Eyelogo} height="40px" onClick={() => { showPassword() }} />
            <br />
           Contact: <input type="number" value={state.contact} onChange={(event) => { contactHandler(event) }} /><br /><br />

           Email:   <input type="email" name="email" value={state.email} onChange={(event) => { emailHandler(event) }} />
            <button onClick={(event) => { buttonHandler(event) }}>Add</button>
            <br /><br />
           Contry: <select onChange={(event) => { selectHandler(event) }} >
                <option>Select country</option>
                {
                    state.data.map((item) => {
                     return  <option>{item}</option>
                    })
                }
            </select>
            <button onClick={() => { countryHandler() }}>Transfer</button>
           Copy Country <select>
                <option>Country</option>
                {
                    state.countryList.map((item) => (
                        <option>{item}</option>
                    ))
                }
            </select>
            <br /><br />
           Enter number : <input type="number" name="firstNumber" onChange={(event) => { numberHandler(event) }} />
           Select method:
            <select onChange={(event) => { methodHandler(event) }}>
                <option>Method</option>
                <option value="sum">+</option>
                <option value="sub">-</option>
                <option value="mul">*</option>
                <option value="div">/</option>
            </select>
          Enter number: <input type="number" name="secondNumber" onChange={(event) => { numberHandler(event) }} />
            <button onClick={() => { pressHandler() }}>Press</button><br />
            <h1>{state.output}</h1>
        </div>
        
    )
}
