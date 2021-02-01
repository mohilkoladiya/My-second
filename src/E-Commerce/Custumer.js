import React, { useState } from 'react'
import Tv from './images/tv.webp'
import Ac from './images/ac.jpg'
import Fan from './images/fan.png'
import Fridge from './images/fridge.jpg'
import Button from 'react-bootstrap/Button'
import Cart from './images/cart.jpg'
import { useHistory } from 'react-router-dom'

export default function Custumer() {
    let history = useHistory()
    const [cust, setCust] = useState({
        data: JSON.parse(localStorage.getItem('data')),
        list: []
    })
    // const status = localStorage.getItem("token1")
    // let loggedIn = true
    // if (status !== 'Custumer') {
    //     loggedIn = false
    // }
    // if (loggedIn === false) {
    //     return <Redirect to="/" />
    // }

    const cartHandler = (data) => {
        if (cust.list.length === 0) {
            const rupiya = data.price[data.price.length - 1].amount
            data.totalMRP = rupiya
            setCust({
                ...cust,
                list: [...cust.list, data]
            })
        }
        else {
            const exist = cust.list.filter((item) => {
                return data.id == item.id
            })
            if (exist.length > 0) {
                const index = cust.list.findIndex((item) => {
                    return item.id === data.id;
                })

                const rupiya = data.price[data.price.length - 1].amount
                const dummy = cust.list
                dummy[index].qty = cust.list[index].qty + 1
                dummy[index].totalMRP = cust.list[index].qty * rupiya
                setCust({
                    ...cust,
                    list: [...dummy]
                })
            } else {
                setCust({
                    ...cust,
                    list: [...cust.list, data]
                })
            }
        }
    }
    const cartItems=()=>{
        history.push("/")
    }
    localStorage.setItem("cartItem", JSON.stringify(cust.list))
    return (
        <div align="center">
            <h1>Product</h1>
            <img src={Cart} height="150px" width="150px" style={{borderRadius: "50%" }} onClick={()=>cartItems()}/>
            <div>
                <table width="100%">
                    <tr>
                        {!cust.data == "" && cust.data.map((item) => {
                            return (

                                <td>
                                    { item.name == "TV" && <img src={Tv} alt="abc" height={200} />}
                                    { item.name == "AC" && <img src={Ac} alt="abc" height={200} />}
                                    { item.name == "Fan" && <img src={Fan} alt="abc" height={200} />}
                                    { item.name == "Fridge" && <img src={Fridge} alt="abc" height={200} />}
                                    <br />
                                    Name:{item.name}

                                    <td>Price:{item.price[item.price.length - 1].amount}</td>
                                    <Button onClick={() => cartHandler(item)}>Add to Cart</Button>
                                </td>
                            )
                        })}
                    </tr>
                </table>
            </div>
        </div>
    )
}
