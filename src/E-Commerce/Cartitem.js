import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function Cartitem() {
    const cartData = (JSON.parse(localStorage.getItem('cartItem')));
    const [cart, setCart] = useState({
        data: cartData

    })
    console.log(cart.data);

    return (
        <>
            <div>
                <h1 align="center">Your Cart Item</h1>
            </div>
            <div>
                <table align="center" border="1px" >
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Item Quentity</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            cart.data.map((item) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.qty}</td>
                                            {item.price.map((item) => {
                                                return <td>{item.amount}</td>
                                            })}
                                            {item.price.map((item) => {
                                                return <td>{item.date}</td>
                                            })}
                                            <td>{item.totalMRP}</td>
                                        </tr>
                                    </>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}
