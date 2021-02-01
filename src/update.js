import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'


export default function Update() {
    const [state, setState] = useState([
        { id: "1", fname: "mohil", city: "surat", isSatus: false },
        { id: "2", fname: "baman", city: "baroda", isSatus: false },
        { id: "3", fname: "kashi", city: "dubai", isSatus: false },
        { id: "4", fname: "dhoklo", city: "bharuch", isSatus: false },
        { id: "5", fname: "devo", city: "amreli", isSatus: false },
        { id: "6", fname: "varsidh", city: "bhavnagar", isSatus: false },
        { id: "7", fname: "command", city: "rajkot", isSatus: false },
        { id: "8", fname: "raj", city: "mumbai", isSatus: false },
        { id: "9", fname: "bhano", city: "kolkata", isSatus: false },
        { id: "10", fname: "yash", city: "daman", isSatus: false },
    ])
    const [field, setField] = useState({
        id: '',
        fname: '',
        city: '',
        isSatus: true,
    })

    const inputHandler = (event) => {
        setField({ ...field, [event.target.name]: event.target.value })
    }

    const updateHandler = (id) => {
        const index = state.findIndex((item) => {
            return item.id === id
        })
        if (index >= 0) {
            const dummy = state
            dummy.map((item) => {
                if (item.id === id) {
                    item.isSatus = true
                } else {
                    item.isSatus = false
                }
            })
            setState([...dummy])
            dummy.map((item) => {
                if (item.id === id) {
                    setField(item)
                }
            })
        }
    }
    const submitHandler = (id) => {
        const index = state.findIndex(data => {
            return data.id === id

        })
        if (index >= 0) {
            const dummy = state
            dummy[index].fname = field.fname
            dummy[index].city = field.city
            dummy[index].isSatus = !dummy[index].isSatus
            setState([...dummy])
            setField({
                id: "",
                fname: "",
                city: "",
                isSatus: true
            })
        }
    }
    return (
        <>
            <div>
                <table align="center" border="1px1" width="40%">
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>City</th>
                        <th>Update</th>
                    </tr>
                    {
                        state.map((item) => {
                            return (

                                <tr>
                                    <td>{item.id}</td>
                                    <td>
                                        <div>
                                            {item.isSatus ? (<u><input type="text" value={field.fname} name="fname" onChange={(event) => inputHandler(event)} /></u>)
                                                : (<ul>{item.fname}</ul>)}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {item.isSatus ? (<u><input type="text" value={field.city} name="city" onChange={(event) => inputHandler(event)} /></u>)
                                                : (<ul>{item.city}</ul>)}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {!item.isSatus ? <Button onClick={() => { updateHandler(item.id) }}>Update</Button>
                                                :<Button variant="warning" onClick={() => { submitHandler(item.id) }}>Submit</Button>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </>
    )
}


