import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tabs'
import { ModalFooter } from 'react-bootstrap'

export default class Multiselectcountry extends Component {
    state = {
        list: [],
        country: ["India", "USA", "England", "Africa", "Japan", "China", "Pakistan", "Afghanistan", "Shri lanka", "United arab", "germony", "canada","Switzerland"],
        selectedCountry: [],
        finalCountry: [],
        currentView: 1,
        showModel: false,
        formFiled: {
            date: ''
        }
    }

    multipleHandler = (e) => {
        const conutry = e.target.value.toLowerCase()
        const countryfilter = conutry.replaceAll(" ", "-")
        this.setState({
            ...this.state,
            selectedCountry: [
                ...this.state.selectedCountry,
                countryfilter
            ]
        })
    }

    submitHandler = () => {
        this.setState({
            ...this.state,
            finalCountry: [...new Set(this.state.selectedCountry)],
            currentView: 2
        })

    }

    formHandler = (event) => {
        this.setState({
            ...this.state,
            formFiled: {
                ...this.state.formFiled,
                [event.target.name]: event.target.value
            }
        })

    }

    saveForm = (e) => {
        e.preventDefault();
        const obj = {
            id: Math.random().toString(36).substr(2, 9),
            date: this.state.formFiled.date,
            cases: [
                ...this.state.finalCountry.map(item => {
                    return {
                        country: item,
                        case: this.state.formFiled[item]
                    }
                })
            ]
        }
        this.setState({
            ...this.state,
            list: [...this.state.list, obj],
            showModel: false,
            currentView: 3
        })
    }

    render() {
        return (
            <>
                {/* view 1 */}
                {
                    this.state.currentView === 1 && (

                        <div align="center">
                            <h1>Select Your Country (Step : 1)</h1>
                            <br />
                            <select value={this.state.country} onChange={this.multipleHandler}>
                                <option>---Selecy Country---</option>
                                {
                                    this.state.country.map((item) => {
                                        return (
                                            <option>{item}</option>
                                        )
                                    })
                                }
                            </select><br /><br />
                            <Button onClick={this.submitHandler}>Next</Button>
                        </div>
                    )}

                {/* view 2 */}
                {this.state.currentView === 2 && (
                    <div align="center">
                        <h1>Add Corona Cases(Step : 2)</h1><br />
                        <Button onClick={
                            () => {
                                this.setState({
                                    ...this.state,
                                    showModel: true
                                })
                            }}>Next Step</Button>
                        <Modal show={this.state.showModel} onHide={
                            () => {
                                this.setState({
                                    ...this.state,
                                    showModel: false
                                })
                            }
                        }>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Corona Cases</Modal.Title>
                            </Modal.Header>
                            <form onSubmit={this.saveForm}>
                                <Modal.Body>
                                    {`Date: `}
                                    <input type="date" name="date" value={this.state.formFiled.date}
                                        onChange={this.formHandler} />
                                    <br />
                                    <br />
                                    {

                                        this.state.finalCountry.map(item => (
                                            <>
                                                {`${item} : `}
                                                <textarea type="text" name={item} placeholder={`Enter ${item} Cases`}
                                                    onChange={this.formHandler} />
                                                <br />
                                                <br />
                                            </>
                                        ))
                                    }
                                </Modal.Body>
                                <ModalFooter>
                                    <Button type="submit">Save Changes</Button>
                                </ModalFooter>
                            </form>
                        </Modal>
                    </div>
                )}

                {this.state.currentView === 3 && (
                    <div align="center">
                        <h1>(Select Your Country And Show Cases (Step: 3))</h1>
                        <Accordion defaultActiveKey={1}>
                            <Card>
                                {
                                    this.state.list.map((item, index) => {
                                        return (
                                            <div>
                                                <Card.Header>
                                                    <Accordion.Toggle as={Button} variant="link" eventKey={index + 1}>
                                                        <h2>{item.date}</h2>
                                                    </Accordion.Toggle>
                                                </Card.Header>


                                                <Accordion.Collapse eventKey={index + 1}>
                                                    <Card.Body>
                                                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                                                            {
                                                                item.cases.map((data) => (
                                                                    <Tab eventKey={data.country} title={data.country}>
                                                                        <br />
                                                                        <h1>
                                                                            Todays {data.country} Cases :
                                                                            <br />
                                                                            {data.case}
                                                                        </h1>
                                                                    </Tab>
                                                                ))
                                                            }
                                                        </Tabs>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </div>
                                        )
                                    })
                                }
                            </Card>
                        </Accordion>
                    </div>
                )}
            </>
        )
    }
}

