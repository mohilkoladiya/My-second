import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { ModalBody, ModalTitle } from 'react-bootstrap'

export default class Accordian extends Component {
    state = {
        show: false,
        list: [],
        formFeild: {
            id: '',
            question: '',
            answer: ''
        }
    }

    handleInput = (e) => {
        this.setState({
            ...this.state,
            formFeild: {
                ...this.state.formFeild,
                [e.target.name]: e.target.value
            }
        })
    }

    submitHandler = (e) => {
        const { id, answer } = this.state.formFeild;
        e.preventDefault();
        if (id) {
            const index = this.state.list.findIndex(item => {
                return item.id === id
            })
            if (index >= 0) {
                const dummy = this.state.list
                dummy[index].answer = [...dummy[index].answer, answer]
                this.setState({
                    ...this.state,
                    list: dummy,
                    formFeild: {
                        id: '',
                        question: '',
                        answer: ''
                    },
                    show: false
                })
            }
        } else {
            this.setState({
                list: [
                    ...this.state.list, {
                    ...this.state.formFeild,
                    id: Math.random().toString(36).substr(2, 9),
                    answer: [this.state.formFeild.answer]
                }],
                formFeild: {
                    id: '',
                    question: '',
                    answer: ''
                },
                show: false
            })
        }

    }

    addAnsHandler = (item) => {
        this.setState({
            ...this.state,
            formFeild: {
                ...this.formFeild,
                question: item.question,
                id: item.id
            },
            show: true
        })
    }

    render() {
        return (
            <>
                <div align="center">
                    <h1>Question-Answer</h1>
                    <Button variant="info" onClick={() => {
                        this.setState({
                            ...this.state, show: true,
                            formFeild: {
                                id: '',
                                question: '',
                                answer: ''
                            }
                        })
                    }}>OPEN</Button>
                </div>
                <Modal show={this.state.show} onHide={() => {
                    this.setState({
                        ...this.state,
                        show: false
                    })
                }} backdrop="static" keyboard={false}>
                    <ModalHeader closeButton>
                        <ModalTitle>Your Question--Answer</ModalTitle>
                    </ModalHeader>

                    <ModalBody>
                        <form onSubmit={this.submitHandler}>
                            {this.state.formFeild.id && (<b>id : {this.state.formFeild.id}</b>)}
                            <br />
                            <b>Question:</b>
                            {
                                this.state.formFeild.question && this.state.formFeild.id ? <span>{this.state.formFeild.question}</span> :
                                    <input type="text" placeholder="Enter your question"
                                        onChange={this.handleInput}
                                        value={this.state.formFeild.question}
                                        name="question" style={{ width: "370px" }}
                                    />
                            }
                            <br /><br />

                            <b>Answer:</b> <textarea type="textarea" placeholder="Enter your ansewr"
                                onChange={this.handleInput}
                                value={this.state.formFeild.answer}
                                name="answer" style={{ width: "380px", height: "100px" }} />
                            <br /><br />
                            <Button variant="success" type="Submit">Submit</Button>
                        </form>
                    </ModalBody>
                </Modal>
                <br /><br />
                <div align="center">
                    <h3>Your all Questions - Answers are heare... </h3><br />
                    <Accordion defaultActiveKey={1}>
                        <Card>

                            {
                                this.state.list.map((item, i) => {
                                    return (
                                        <div>
                                            <Accordion.Toggle as={Button} variant="link" eventKey={i + 1}>
                                                <b>Q-{i + 1}</b>{item.question}
                                            </Accordion.Toggle>

                                            <Accordion.Collapse eventKey={i + 1}>
                                                <Card.Body>
                                                    {
                                                        item.answer.map((ans) => {
                                                            return (
                                                                <div>
                                                                    <b>Answer:</b>{ans}<br />
                                                                </div>
                                                            )

                                                        })
                                                    }
                                                    <Accordion.Toggle as={Button} variant="link"
                                                        onClick={() => this.addAnsHandler(item)}>Add Your Answer</Accordion.Toggle>
                                                </Card.Body>
                                            </Accordion.Collapse><br />

                                        </div>
                                    )
                                })
                            }
                        </Card>
                    </Accordion>
                </div>
            </>
        )
    }
}

