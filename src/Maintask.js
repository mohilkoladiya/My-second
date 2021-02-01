import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import { ModalBody, ModalTitle } from 'react-bootstrap'
import './Todoapp.css';

export default class Maintask extends Component {
    state = {
        show: false,
        list: [],
        formFiled: {
            id: '',
            fname: '',
            lname: '',
            contact: '',
            email: '',
        },
        error: {
            fnameError: '',
            fnameError: '',
            contactError: '',
            emailError: '',
        },
        dummyList: [],
    }
    handleInput = (e) => {
        this.setState({
            ...this.state,
            formFiled: {
                ...this.state.formFiled,
                [e.target.name]: e.target.value
            },
            error: {
                fnameError: '',
                lnameError: '',
                emailError: '',
            }
        })
    }
    handleSubmit = (e) => {
        const {id, fname, lname, contact, email } = this.state.formFiled
        e.preventDefault();
        if (fname === '') {
            this.setState({
                error: {
                    ...this.state.erros,
                    fnameError: "First Name is Required"
                }
            })
        }
        else if (fname.length < 3) {
            this.setState({
                error: { fnameError: "Please enter atleast 3 or more character" }
            })
        }
        else if (lname === '') {
            this.setState({
                error: {
                    lnameError: "Last Name is Required"
                }
            })
        }
        else if (lname.length < 3) {
            this.setState({
                error: { lnameError: "Please enter atleast 3 or more character" }
            })
        }
        else if (contact === '') {
            this.setState({
                error: { contactError: "Contact Is Required" }
            })
        }
        else if (contact.length !== 10) {
            this.setState({
                error: { contactError: "Invalied mobile number" }
            })
        }
        else if (email === '') {
            this.setState({
                error: { emailError: "Email is required" }
            })
        }
        else if (!/^\w+([-+.'][^\s]\w+)*([-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.state.formFiled.email)) {
            this.setState({
                error: { emailError: "Please enter valied email" }
            })
        }
        else {
            if(id){
                const index = this.state.dummyList.findIndex(item=>{
                   return item.id === id
                })
                if(index>=0){
                    const dummy = this.state.dummyList;
                    dummy[index].fname=fname     
                    dummy[index].lname=lname     
                    dummy[index].contact=contact     
                    dummy[index].email=email   
                    this.setState({
                        ...this.state,
                        list:dummy,
                        dummyList:dummy,
                        show:false
                    })
                    
                }
                console.log(index);
                
            }else   {
                // console.log("add");
            this.setState({
                list: [...this.state.list, { ...this.state.formFiled, id: Math.random().toString(36).substr(2, 9) }],
                dummyList: [...this.state.list, { ...this.state.formFiled, id: Math.random().toString(36).substr(2, 9) }],
                show: false
            })
        }
        }
    }

    contactHandler = (e) => {
        const { contact } = this.state.formFiled
        if (e.target.value.length <= 10) {
            this.setState({
                ...this.state,
                formFiled: {
                    ...this.state.formFiled,
                    contact: e.target.value
                },
                error: {
                    contactError: ''
                }
            })
        }
    }

    searchHandler = (e) => {
        const dummyList = this.state.list;
        this.setState({
            ...this.state,
            dummyList: dummyList.filter(item => item.fname.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
        })
    }

    deletHandler = (id) => {
        const listAfterDelete = this.state.dummyList.filter((item) => {
            return item.id !== id
        })
        this.setState({
            ...this.state,
            dummyList: listAfterDelete,
            list: listAfterDelete
        })
    };

    updateHandler = (item) => {
        this.setState({
            ...this.state,
            formFiled: {
                ...this.state.formFiled,
                id: item.id,
                fname: item.fname,
                lname: item.lname,
                contact: item.contact,
                email: item.email,
            },
            show: true
        })
    }

    render() {
        return (
            <>
                <div align="center">
                    <h1><b>CONTACT FORM</b></h1><br />
                    <Button variant="info" align="center"
                        onClick={() => {
                            this.setState({
                                ...this.state, show: true,
                                formFiled: {

                                    fname: '',
                                    lname: '',
                                    contact: '',
                                    email: '',
                                }
                            })
                        }}>Contact</Button>
                </div>
                <Modal show={this.state.show} onHide={() => {
                    this.setState({
                        ...this.state,
                        show: false,
                        formFiled: {
                            fname: '',
                            lname: '',
                            contact: '',
                            email: '',
                        }
                    })
                }} backdrop="static" keyboard={false}>
                    <ModalHeader closeButton>

                        <ModalTitle >Contact Form</ModalTitle>
                    </ModalHeader>
                    <ModalBody className="todo">
                        <form onSubmit={this.handleSubmit}  >
                            <b>First Name:</b> <input type="text"
                                onChange={this.handleInput}
                                name="fname"
                                id="todoformInput"
                                value={this.state.formFiled.fname} /><br />
                            <p style={{ color: 'red' }}>{this.state.error.fnameError}</p>

                            <b>Last Name:</b>  <input type="text"
                                onChange={this.handleInput}
                                name="lname"
                                id="todoformInput"
                                value={this.state.formFiled.lname} />
                            <p style={{ color: 'red' }}>{this.state.error.lnameError}</p>

                            <b>Contact:</b>  <input type="number"
                                onChange={this.contactHandler}
                                name="contact"
                                id="todoformInput"
                                value={this.state.formFiled.contact} />
                            <p style={{ color: 'red' }}>{this.state.error.contactError}</p>

                            <b>Email:</b>  <input type="text"
                                onChange={this.handleInput}
                                name="email"
                                id="todoformInput"
                                value={this.state.formFiled.email} />
                            <p style={{ color: 'red' }}>{this.state.error.emailError}</p>

                            <br />
                            <Button type="Submit" var   iant="success" >Submit</Button>
                        </form>
                    </ModalBody>
                </Modal>
                <br />
                <br />
                <div align="center">
                    <b>Search :</b><input type="text" id="todoformInput" onKeyUp={this.searchHandler} />
                    <br />
                    <table border="1px:solid:black" width="100%">
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Delet</th>
                            <th>Update</th>
                        </tr>
                        {/* {
                            this.state.list.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.fname}</td>
                                    <td>{item.lname}</td>
                                    <td>{item.contact}</td>
                                    <td>{item.email}</td>
                                </tr>
                            )
                            )
                        } */}
                        {

                            this.state.dummyList.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.id}</td>
                                    <td>{item.fname}</td>
                                    <td>{item.lname}</td>
                                    <td>{item.contact}</td>
                                    <td>{item.email}</td>

                                    <td><Button variant="danger"
                                        type="Button"
                                        onClick={() => this.deletHandler(item.id)}>Delete</Button></td>

                                    <td><Button variant="warning"
                                        type="Button"
                                        onClick={() => this.updateHandler(item)}>Update</Button></td>

                                </tr>
                            )
                            )
                        }
                        {

                        }
                    </table>
                </div>
            </>
        )
    }
}
