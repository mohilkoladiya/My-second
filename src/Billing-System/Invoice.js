import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Bill from './bill.css'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import { ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap'


export default function System({ props }) {
    const [data, setData] = useState(props) 
    const [showDiscount, setshowDiscount] = useState(false)
    const [discount, setDiscount] = useState()
    const [finalPrice, setFinalPrice] = useState()

    const discountHandler = (event) => {
        setDiscount(event.target.value)
    }
    const priceLessHandler = () => {
        const final = data.totalPrice - discount
        setFinalPrice(final)
        setshowDiscount(false)
    }
    return (
        <>

            <div>
                <Card style={{ align: "center" }} className="card">
                    <Card.Header className="header">
                        <div>
                            <h2>INVOICE</h2>
                        </div>
                        <div>
                            <p className="Contact">+91 74352356565</p>
                            <p className="Contact">bluesoft@gmail.com</p>
                        </div>
                        <ul style={{ listStyleType: "none" }}>
                            <li className="address">202, rizeOn plaza </li>
                            <li className="address">surat , gujrat </li>
                            <li className="address">395006 </li>
                        </ul>
                    </Card.Header>
                    <Card.Body>
                        <div className="client">
                            <div align="left">
                                <p className="client">Billed To</p>
                                <b>{data.fname}<br />
                                   {data.address}</b>
                            </div>
                            <div>
                                <p className="client">Invoice number: <b>{data.billNo}</b></p>
                                <p className="client">Gst number:<b>{data.gstNo}</b></p>
                                <p className="client">Date:<b>{data.date}</b></p>
                            </div>
                            <div style={{ listStyleType: "none" }}>
                                <li className="client">Invoice Total </li>

                                <h2 style={{ color: "#039dfc" }}>
                                    ${finalPrice ? finalPrice : data.totalPrice}
                                </h2>
                            </div>
                        </div>

                        <hr color='#039dfc' />

                        <div>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Price   </th>
                                        <th>Quntity</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data && data.itemsList &&
                                        data.itemsList.map((item) => (
                                            <tr>
                                                <td>{item.item}</td>
                                                <td>${item.price}</td>
                                                <td>{item.qty}</td>
                                                <td>{item.price * item.qty}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                        <Button onClick={() => { setshowDiscount(true) }}>Discount</Button>

                        <div style={{ textAlign: "right", color: "#039dfc" }}>
                            <h6> Subtotal: ${data.totalPrice}</h6>
                            <h6>Tax: ${0}</h6>
                            <h6>Discount :${discount}</h6>
                            <h6>Total:${finalPrice}</h6>
                        </div>
                    </Card.Body>
                </Card>
                <Modal show={showDiscount} onHide={() => { setshowDiscount(false) }} backdrop="static" keyboard={false}>
                    <ModalHeader closeButton>
                        <ModalTitle>Add Discount</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        Discount: <input type="number"
                            onChange={(event) => { discountHandler(event) }} />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => { priceLessHandler() }}>Less</Button>
                    </ModalFooter>
                </Modal>
            </div>

        </>
    )
}
