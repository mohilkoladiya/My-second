import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import { ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap'
import Invoice from './Invoice'


export default function Bill(props) {
    var history = useHistory()
    const [show, setShow] = useState(false);
    const [quentity, setquentity] = useState(1);
    const [showSystem, setShowSystem] = useState(false);
    const [price, setPrice] = useState();
    const [feild, setFeild] = useState({
        billNo: Math.random().toString(36).substr(2, 9),
        fname: "",
        address: "",
        contact: "",
        gstNo: "",
        date: "",
        itemsList: [{
            id: Math.random().toString(36).substr(2, 9),
            item: "",
            price: "",
            qty: 1
        }],
        totalPrice: "",
    })
    const [item] = useState({
        item: "",
        price: "",
        qty: 1,
    })

    const handleInput = (event) => {
        setFeild({
            ...feild,
            [event.target.name]: event.target.value
        })
    }
    const submitHandler = (event) => {
        event.preventDefault()
        const total = feild.itemsList.reduce((sum, p) => sum + p.price * p.qty, 0);
        var d = new Date();
        var datestring = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes();
        setFeild({
            ...feild,
            totalPrice: total,
            date: datestring
        })
        setShow(false)
        setShowSystem(true)
    }

    const addItemHandler = () => {
        setFeild({
            ...feild,
            itemsList: [...feild.itemsList, { ...item, id: Math.random().toString(36).substr(2, 9) }]
        })
    }

    const itemHandler = (event, id) => {
        const index = feild.itemsList.findIndex(item => {
            return item.id === id
        })
        if (index > -1) {
            const dummyList = feild.itemsList
            dummyList[index][event.target.name] = event.target.value

            setFeild({
                ...feild,
                itemsList: [
                    ...dummyList,
                ]
            })
        }
        else {
            return null;
        }
    }

    const handleQty = (event, type, id) => {
        event.preventDefault();
        const index = feild.itemsList.findIndex(item => {
            return item.id === id
        })

        if (index > -1) {
            const dummyList = feild.itemsList;
            if (type === 'increment') {
                dummyList[index].qty += 1;
            } else {
                dummyList[index].qty -= 1;
            }
            setFeild({
                ...feild,
                itemsList: [
                    ...dummyList,
                ]
            })
        } else {
            return null;
        }
    }
    return (
        <>
            { showSystem && <Invoice props={feild} />}

            { !showSystem && <div align="center" >
                <h1 > Billing - System </h1><br />
                <Button type="button" onClick={() => { setShow(true) }} >Add Bill </Button>
            </div >}

            <div >
                <Modal show={show} onHide={() => { setShow(false) }} backdrop="static" keyboard={false} >

                    <ModalHeader closeButton >
                        <ModalTitle > Adding Bill Detail </ModalTitle>
                    </ModalHeader >

                    <ModalBody >
                        <ModalHeader><h3>Customer Details</h3></ModalHeader>
                        <form onSubmit={(event) => { submitHandler(event) }}>
                            Bill no: <b>{feild.billNo}</b><br /><br />

                            Name: < input type="text" onChange={
                                (event) => { handleInput(event) }}
                                placeholder="Enter name*"
                                name="fname" />

                            Address: < input type="textarea"
                                onChange={(event) => { handleInput(event) }}
                                placeholder="Enter address*"
                                name="address" /> < br /> < br />

                            Contact: < input type="number"
                                onChange={(event) => { handleInput(event) }}
                                placeholder="Enter contact*"
                                name="contact" />

                            Gst NO: < input type="text"
                                onChange={(event) => { handleInput(event) }}
                                placeholder="Enter gst number*"
                                name="gstNo" />

                            <ModalHeader><h3> Product Detail </h3></ModalHeader >

                            <Button onClick={() => { addItemHandler() }}>AddItem</Button>  <br />


                            <div>
                                {feild && feild.itemsList &&
                                    feild.itemsList.map((item) => (
                                        <>
                                            Item Name: < input type="text"
                                                onChange={(event) => { itemHandler(event, item.id) }}
                                                placeholder="Enter item name*"
                                                name="item" />

                                                Price: < input type="number"
                                                onChange={(event) => { itemHandler(event, item.id) }}
                                                placeholder="Enter price*"
                                                name="price" />

                                            Quentity:  <button onClick={(event) => { handleQty(event, 'decrement', item.id) }}>-</button>
                                            {item.qty}
                                            <button onClick={(event) => { handleQty(event, 'increment', item.id) }}>+</button><br /><br />
                                        </>
                                    )
                                    )}
                            </div>

                            <ModalFooter>
                                <Button type="submit">Submit</Button>
                            </ModalFooter>
                        </form>
                    </ModalBody >
                </Modal>
            </div >
        </>
    )
}