import React, { Component } from 'react';

class Ipl extends Component {
    state = {
        price1: ["300", "300", "300", "300", "300"],
        price2: ["250", "250", "250", "250", "250"],
        price3: ["200", "200", "200", "200", "200"],
        price4: ["150", "150", "150", "150", "150"],
        price5: ["100", "100", "100", "100", "100"],
    }
    firstHandler = (e) => {
        alert('hii')
        console.log(e.target.value);
    }
    render() {
        return (
            <>
            <div align="center">
                <p>Set Youre Adevertisement</p>
                <table border="1px solid black">
                    {this.state.price1.map((item) => { return (<button className="btn" style={{ marginLeft: "10px" }} >{item}</button>) })}
                </table>
                <table border="1px solid black">
                    {this.state.price2.map((item) => { return (<button class="btn" style={{ marginLeft: "10px" }} >{item}</button>) })}
                </table>
                <table border="1px solid black">
                    {this.state.price3.map((item) => { return (<button class="btn" style={{ marginLeft: "10px" }} >{item}</button>) })}
                </table>
                <table border="1px solid black">
                    {this.state.price4.map((item) => { return (<button class="btn" style={{ marginLeft: "10px" }} >{item}</button>) })}
                </table>
                <table border="1px solid black">
                    {this.state.price5.map((item) => { return (<button class="btn" style={{ marginLeft: "10px" }} >{item}</button>) })}
                </table>
            </div>

            <div>
                
            </div>
            </>
        );
    }
}
export default Ipl; 