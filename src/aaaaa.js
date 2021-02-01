import React, { useState } from 'react'

export default function City() {
    const [state, setState] = useState([

        { id: 1, Fname: "yash", City: "surat", Age: "25", isStatus: true },
        { id: 2, Fname: "mohil", City: "maharasta", Age: "22", isStatus: true },
        { id: 3, Fname: "raj", City: "bhopal", Age: "26", isStatus: true },
        { id: 4, Fname: "vaman", City: "chandigadh", Age: "10", isStatus: true },
        { id: 5, Fname: "shatish", City: "div", Age: "19", isStatus: true },
        { id: 6, Fname: "manan", City: "daman", Age: "15", isStatus: true },
        { id: 7, Fname: "het", City: "rajsatn", Age: "10", isStatus: true },
        { id: 8, Fname: "raman", City: "ahamdabad", Age: "60", isStatus: true },
        { id: 9, Fname: "divang", City: "goa", Age: "12", isStatus: true },
        { id: 10, Fname: "pinak", City: "bhopalcl", Age: "30", isStatus: true }
    ])

    const [Fild, setFild] = useState({
        id: "",
        Fname: "",
        City: "",
        Age: "",
        isStatus: false
    })


    const EditHandler = (id) => {
        console.log(id);
        const index = state.findIndex(item => {
            return item.id === id
        })

        if (index >= 0) {
            const dummy = state

            dummy.map(item => {
                if (item.id === id) {
                    item.isStatus = false
                } else {
                    item.isStatus = true
                }
            })
            console.log(dummy);
            setState([
                ...dummy,
            ])
            console.log(dummy);

            dummy.map(item => {
                if (item.id === id) {
                    setFild(item)
                }
            })
        }
    }

    const CloseHandler = (id) => {
        const index = state.findIndex(item => {
            return item.id === id
        })

        if (index >= 0) {
            const dummy = state
            dummy[index].isStatus = !dummy[index].isStatus
            setState([
                ...dummy,

            ])
        }
    }
    const ItemHandler = (event) => {
        console.log("called", event.target.value, event.target.name);
        console.log("called", Fild);
        setFild({ ...Fild, [event.target.name]: event.target.value })


    }
    const saveSubmit = (id) => {
        const index = state.findIndex(data => {
            return data.id === id

        })

        if (index >= -1) {
            const dummy = state
            dummy[index].Fname = Fild.Fname
            dummy[index].City = Fild.City
            dummy[index].Age = Fild.Age
            dummy[index].isStatus = !dummy[index].isStatus
            setState([...dummy])
            setFild({
                id: "",
                Fname: "",
                City: "",
                Age: "",
                isStatus: false
            })
        }


    }

    return (
        <div align="center">
            <h1>LIST.Student</h1>


            <table border="2px:solid:black" width="600" >
                <tr>
                    <th>id</th>
                    <th>Fname</th>
                    <th>City</th>
                    <th>Age</th>
                    <th>Changes</th>
                </tr>



                {
                    state.map((item) => {
                        return (
                            <tr>

                                <td>{item.id}</td>
                                <td>
                                    <div>
                                        <b>
                                            {!item.isStatus ? (<u>
                                                <input type="text" name="Fname" value={Fild.Fname} onChange={(event) => { ItemHandler(event) }} />
                                            </u>) : (<u>
                                                {item.Fname}
                                            </u>)}


                                        </b>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <b>
                                            {!item.isStatus ? (<u>
                                                <input type="text" name="City" value={Fild.City} onChange={(event) => { ItemHandler(event) }} />
                                            </u>) : (<u>
                                                {item.City}
                                            </u>)}


                                        </b>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <b>
                                            {!item.isStatus ? (<u>
                                                <input type="text" name="Age" value={Fild.Age} onChange={(event) => { ItemHandler(event) }} />
                                            </u>) : (<u>
                                                {item.Age}
                                            </u>)}


                                        </b>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {
                                            item.isStatus ? (<button type="button" onClick={() => EditHandler(item.id)}>Edit</button>
                                            ) : (<div><button onClick={() => saveSubmit(item.id)}>save</button>
                                                <button onClick={() => CloseHandler(item.id)}>Close</button></div>
                                                )}
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>

    )


}