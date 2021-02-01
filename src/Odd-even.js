import React, { useState } from 'react'
import Smallboy from './image/smallboy.jpg'
import Clgboy from './image/clgboy.jpg'
import Schoolboy from './image/schoolboy.jpg'
import Fatherage from './image/fatherage.jpg'
import Oldman from './image/oldman.jpg'

export default function Oddeven() {
    const [state, setState] = useState({
        number: '',
        list: ["Address", "Gender", "Hobby", "Education", "Status"],
        feildList: [],
        feild: '',
        age: '',
        smallboy: <img src={Smallboy} />,
        clgboy: <img src={Clgboy} />,
        schoolboy: <img src={Schoolboy} />,
        father: <img src={Fatherage} />,
        oldman: <img src={Oldman} />,
        
    })
    const Task1Handler = (event) => {
        setState({
            ...state,
            number: event.target.value
        })
    }
    const feildHandler = (event) => {
        setState({
            ...state,
            feild: event.target.value
        })
    }
    const buttonHandler = () => {
        const data = state.feildList
        data.push(state.feild)
        setState({
            ...state,
            feildList: [...new Set(data) ]
        })
       
    }
    const ageHandler = (event) => {
        setState({
            ...state,
            age: event.target.value
        })
    }
    
    return (
        <>
            <div>
                <h3>Task 1: </h3>
        Enter number: <input type="number" onChange={(event) => { Task1Handler(event) }} />
                {state.number.length !== 0 && (
                    <div>
                        {state.number % 2 == 0 ?
                            <div style={{ height: "50px", width: "50px", background: "green" }}></div> :
                            <div style={{ height: "50px", width: "50px", background: "red" }}></div>
                        }
                    </div>
                )}<br /><br />
                <h3>Task 2:</h3>
                <div dangerouslySetInnerHTML={{ __html: '<b>Hello World</b>' }} />
            </div>
            <div>
                <h3>Task 3:</h3>
                <select onChange={(event) => { feildHandler(event) }}>
                    <option>Add feild</option>
                    {
                        state.list.map((item) => {
                            return <option>{item}</option>
                        })
                    }
                </select>
                <button onClick={() => { buttonHandler() }}>Add Feild</button><br /><br />
                <table border="1px solid #ddd">
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Age</th>
                        {
                            state.feildList.map((item) => {
                                return <th>{item}</th>
                            })
                        }
                    </tr>
                    <tr>
                        <td>15200</td>
                        <td>Mohil</td>
                        <td>City</td>
                        <td>20</td>
                    </tr>
                </table>
            </div>
            <div>
                <h3>Task 3</h3>
            Enter Age:<input type="number" onChange={(event) => { ageHandler(event) }} />
                {state.age.length !== 0 && (
                    <div>
                        {   state.age <= 0 ?
                                <div>please eneter valied Age</div>:
                            state.age <= 10 ?
                                <div>{state.smallboy}</div> :
                            state.age <= 18 ? 
                                <div>{state.schoolboy}</div> :
                            state.age <= 25 ?
                                <div>{state.clgboy}</div> :
                            state.age <= 50 ?
                                <div>{state.father}</div> :
                            state.age <=100 ?                
                                <div>{state.oldman}</div>:
                                <h1> Enter valied Age</h1>
                        }
                    </div>
                )}
            </div>
        </>
    )
}
