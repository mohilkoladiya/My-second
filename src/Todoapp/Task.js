import React, { Component } from 'react'
import { ModalBody, ModalTitle } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import { Link, Redirect } from 'react-router-dom'

export default class Task extends Component {
    constructor(props) {
        super(props)

        const token = localStorage.getItem("token")
        let isloggIn = true
        if (token == null) {
            isloggIn = false
        }
        this.state = {
            list: JSON.parse(localStorage.getItem('data')),
            isloggIn,
            selectedData: [],
            showPopup: false,
            formFeild: {
                id: '',
                name: '',
                email:'',
                address:'',
                gender:'',
                hobby:[]
            },
            error: {
                nameError: '',
                emailError: '',
                addressError: '',
                genderError: '',
                hobbyError: '',
            },

        }
    }
    handleInput = (event) => {
        this.setState({
            ...this.state,
            formFeild: {
                ...this.state.formFeild,
                id:Math.random().toString(36).substr(2, 9),
                [event.target.name]: event.target.value
            },
            selectedData: {
                ...this.state.selectedData,
                id:this.state.selectedData.id,
                [event.target.name]: event.target.value
            },
            error: {
                nameError: '',
                emailError:'',
                addressError:'',
                genderError:'',
                hobbyError: '',

            }
        })
    }
    checkHandle = (event) => {
        this.setState({
            ...this.state,
            formFeild: {
                ...this.state.formFeild,
                hobby: [...this.state.formFeild.hobby,event.target.value]
            },
            selectedData: {
                ...this.state.selectedData,
                hobby: [...this.state.formFeild.hobby,event.target.value]
            },
            error: {
                nameError: '',
                emailError:'',
                addressError:'',
                hobbyError: '',
                genderError:'',
            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {id,name,email,address,gender } = this.state.formFeild
        if (name === '') {
            this.setState({
                error: {
                    ...this.state.error,
                    nameError: "name is required"
                }
            })
        }
        else if (name.length < 3) {
            this.setState({
                error: { nameError: "Please enter atleast 3 or more character" }
            })
        }
        else if(email === ''){
            this.setState({
                error:{emailError:"Email is Required"}
            })
        }
        else if(!/^\w+([-+.'][^\s]\w+)*([-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.state.formFeild.email)){
            this.setState({
                error:{emailError:"enter valied email"}
            })
        }
        else if(address === ''){
            this.setState({
                error:{addressError:"Address is Required"}
            })
        }
        else if(address.length < 10){
            this.setState({
                error:{addressError:"Please Enter Atlest 10 or more character"}
            })
        }
        else if(gender === ''){
            this.setState({
                error:{genderError:"Please Select Your Gender"}
            })
        }
        else {

            const aa = this.state.selectedData
            const dummy = this.state.list
            const filterIndex = dummy.findIndex((data) => {
                return data.id == aa.id
            })
            if (filterIndex > -1) {

                dummy[filterIndex].name = aa.name
                dummy[filterIndex].email = aa.email
                dummy[filterIndex].address = aa.address
                dummy[filterIndex].gender = aa.gender
                dummy[filterIndex].hobby = aa.hobby

                localStorage.setItem("data", JSON.stringify(dummy))
                this.setState({
                    list: JSON.parse(localStorage.getItem('data')),
                    showPopup:false,
                    formFeild: {
                        id: '',
                        name: '',
                        email: '',
                        address: '',
                        gender: '',
                        hobby:[]
                    },
                    selectedData: {
                        id: '',
                        name: '',
                        email: '',
                        address: '',
                        gender: '',
                        hobby:[]
                    },
                });
            }

            else {
                this.setState({
                    ...this.state,
                    list: [...this.state.list, this.state.formFeild],
                    formFeild: {
                        id: '',
                        name: '',
                        email: '',
                        address: '',
                        gender: '',
                        hobby:[]
                    },
                    selectedData: {
                        id: '',
                        name: '',
                        email: '',
                        address: '',
                        gender: '',
                        hobby:[]
                    },
                    showPopup:false

                })

                if (localStorage.getItem('data') == null) {
                    const dummyData = []
                    dummyData.push(this.state.formFeild);
                    localStorage.setItem("data", JSON.stringify(dummyData))
                }
                else {
                    const dummyData = JSON.parse(localStorage.getItem('data'))
                    dummyData.push(this.state.formFeild)
                    localStorage.setItem("data", JSON.stringify(dummyData))
                }
                this.setState({
                    list: JSON.parse(localStorage.getItem('data'))
                });
            }

        }
    }
    deletHandler = (id) => {
        const listAfterDelete = this.state.list.filter((item) => {
            return item.id !== id
        })
        this.setState({
            ...this.state,
            list: listAfterDelete
        })
        localStorage.setItem('data', JSON.stringify(listAfterDelete))
    };

    updateHandler = (item) => {
        this.setState({
            ...this.state,
            selectedData:item,
            formFeild:item,
            showPopup: true
        })
    }
    render() {
        if (this.state.isloggIn === false) {
            return <Redirect to="/" />
        }
        return (
            <>
                
                    <Link to="/logout" className="btn btn-danger" style={{marginTop:"50px"}}>Logout</Link>
                

                <div align="center">
                    <h1 style={{ color: "" }}><b>CONTACT FORM</b></h1>
                    <button variant="info" onClick={() => {
                        this.setState({
                            showPopup: true
                        })
                    }} className="btn btn-info">Open</button>
                </div><br/>

                <Modal show={this.state.showPopup} onHide={() => {
                    this.setState({
                        showPopup: false
                    })
                }} backdrop="static" keyboard={false}>
                    <ModalHeader closeButton>
                        <ModalTitle>Contact Form</ModalTitle>
                    </ModalHeader>

                    <ModalBody className="todo">
                        <form onSubmit={this.handleSubmit}>
                        <b>Name:</b> <input type="text" placeholder="Enter Your Name" 
                                onChange={this.handleInput}
                                value={this.state.selectedData.name}
                                name="name" />
                            <p style={{ color: 'red' }}>{this.state.error.nameError}</p>

                        <b>Email:</b> <input type="text" placeholder="Enter Your Email"
                                   onChange={this.handleInput}
                                   value={this.state.selectedData.email}
                                   name="email" />
                            <p style={{color:'red'}}>{this.state.error.emailError}</p>  

                        <b>Address:</b> <input type="text" placeholder="Enter Address"
                                       onChange={this.handleInput}
                                       value={this.state.selectedData.address}
                                       name="address" />   
                            <p style={{color:'red'}}>{this.state.error.addressError}</p>  

                        <b>Gender:</b> <br/>
                                <input type="radio" onChange={this.handleInput}  value="male"  checked={this.state.selectedData.gender === "male" ? 'checked' : ''} name="gender"/> Male <br/>
                                <input type="radio" onChange={this.handleInput}  value="female" checked={this.state.selectedData.gender === "female" ? 'checked' : ''} name="gender"/> Female <br/>
                                <input type="radio" onChange={this.handleInput}  value="other" checked={this.state.selectedData.gender === "other" ? 'checked' : ''} name="gender"/> Other <br/>
                            <br />

                            <b>Hobby:</b> <br/>
                            <input type="checkbox" name="hobby" value="boxing" onChange={this.checkHandle}
                            checked={
                                this.state.selectedData && 
                                this.state.selectedData.hobby ? 
                                this.state.selectedData.hobby[0] === "boxing" || 
                                this.state.selectedData.hobby[1] === "boxing" || 
                                this.state.selectedData.hobby[2] === "boxing" : ''
                            }
                            />  boxing<br/>

                            <input type="checkbox" name="hobby" value="cricket" onChange={this.checkHandle}
                            checked={
                                this.state.selectedData && 
                                this.state.selectedData.hobby ? 
                                this.state.selectedData.hobby[0] === "cricket" || 
                                this.state.selectedData.hobby[1] === "cricket" || 
                                this.state.selectedData.hobby[2] === "cricket" : ''
                            }
                            />  cricket<br/>

                            <input type="checkbox" name="hobby" value="mma" onChange={this.checkHandle}
                            checked={
                                this.state.selectedData && 
                                this.state.selectedData.hobby ? 
                                this.state.selectedData.hobby[0] === "mma" || 
                                this.state.selectedData.hobby[1] === "mma" || 
                                this.state.selectedData.hobby[2] === "mma" : ''
                            }
                            />  mma <br/><br/>

                            <Button type="submit">Submit</Button>
                        </form>
                    </ModalBody>
                </Modal>
                <div>
                    <Table border="1px:solid:black" width="100%">

                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Gender</th>
                            <th>Hobby</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                        {
                            this.state.list.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.hobby.map(item => item).join(', ')}</td>
                                        <td><Button variant="danger"  onClick={() => this.deletHandler(item.id)}>Delet</Button></td>
                                        <td><Button variant="warning"  onClick={() => this.updateHandler(item)}>Update</Button></td>
                                    </tr>
                                )
                            })
                        }
                    </Table>
                </div>
            </>
        )
    }
}

