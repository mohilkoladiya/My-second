import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'


export default function Admin() {
    let history = useHistory()
    const [prod, setProd] = useState({
        data: JSON.parse(localStorage.getItem('data')),
        product: [
            {
                id: Math.random().toString().substr(9, 4),
                name: 'TV',
                qty: 1,
                price: [],
                totalMRP:0,
            },
            {
                id: Math.random().toString().substr(9, 4),
                name: 'AC',
                qty: 1,
                price: [],
                totalMRP:0
            },
            {
                id: Math.random().toString().substr(9, 4),
                name: 'Fan',
                qty: 1,
                price: [],
                totalMRP:0

            },
            {
                id: Math.random().toString().substr(9, 4),
                name: 'Fridge',
                qty: 1,
                price: [],
                totalMRP:0

            },
        ],
        currentId: '',
        currentPrice: ''
    })

    const status = localStorage.getItem("token1")
    let loggedIn = true 
    if (status !== 'Admin') {
        loggedIn = false
    }
    if (loggedIn === false) {
        return <Redirect to="/" />
        }

    const selectHandler = (e) => {
        setProd({
            ...prod,
            currentId: e.target.value
        })
    }

    const inputHandler = (e) => {
        setProd({
            ...prod,
            currentPrice: e.target.value
        })
    }

    localStorage.setItem("data", JSON.stringify(prod.product ))

    const submitHandler = (e) =>{
        const index = prod.product.findIndex((item) => {
            return item.id === prod.currentId;
        })

        var d = new Date();
        var datestring = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " +
            d.getHours() + ":" + d.getMinutes();

        if (index > -1) {
            const dummy = prod.data;
            dummy[index].price = [
                ...dummy[index].price,

                {
                    id: Math.random().toString().substr(9, 4),
                    date: datestring,
                    amount: prod.currentPrice
                }
            ];
            setProd({
                ...prod,
                product: [...dummy]
            });
            localStorage.setItem("data", JSON.stringify(prod.data))
        } else {
            return;
        }
    }
    const customerHandler = () => {
        history.push("/Custumer")
    }
    const logoutHandler = () => {
        history.push("/Logout1")
    }

    return (
        <>
            <h1>Admin</h1>
            <div>
                Select Product: <select onChange={(e) => { selectHandler(e) }}>
                    <option>---Select Product---</option>
                    {
                        prod.product.map((item) => {
                            return (
                                <>
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                </>
                            )
                        })
                    }
                </select><br /><br />

                Price: <input type="number" name="price" onChange={(e) => { inputHandler(e) }} /><br /><br />

                <Button type="submit" onClick={() => { submitHandler() }}>Add</Button>
                <Button type="submit" variant="warning" onClick={() => { customerHandler() }}>customer</Button>
                <Button type="submit" variant="danger" onClick={() => { logoutHandler() }}>Logout;</Button>
            </div>

            <br />
            { !prod.data == "" && <div>
                <table border="1px">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quentity</th>
                            <th>Price</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            prod.data.map((item) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.qty}</td>
                                            <td>{item.price.map((item) => {
                                                return <tr><td>{item.amount}</td></tr>
                                            })}</td>
                                            <td>{item.price.map((item) => {
                                                return <tr><td>{item.date}</td></tr>
                                            })}</td>
                                        </tr>
                                    </>
                                )
                            }
                            )
                        }
                    </tbody>
                </table>
            </div>
            }
        </>
    )
}
