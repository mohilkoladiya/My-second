import React, { Component } from "react";

export default class abc extends Component {
  
  state = {
    addinput: [],
    isSubmit : false
  };
  addInput = () => {
    if (this.state.addinput.length < 5) {
      this.setState({
        addinput: [
          ...this.state.addinput,
          {
            id: Math.random().toString(36).substr(2, 9),
            Address: "",
            country: "",
            state: "",
            city: "",
          },
        ],
      });
    }
  };
  componentDidMount() {
    this.setState({
      addinput: [
        ...this.state.addinput,
        {
          id: Math.random().toString(36).substr(2, 9),
          Address: "",
          country: "",
          state: "",
          city: "",
        },
      ],
    });
  }
  deletHandler = (item) => {
    const filterData = this.state.addinput.filter((data) => {
      if (item.id !== data.id) {
        return data;
      }
    });
    this.setState({
      addinput: filterData,
    });
  };
  storedHandler = (e, id) => {
    const index = this.state.addinput.findIndex((item) => {
      return item.id === id;
    });
   // console.log(index);
    const dummy = this.state.addinput;
    dummy[index][e.target.name] = e.target.value;

    this.setState({
      ...this.state,
      addInput: dummy,
    });
  };
  render() {
    return (
      <>
        <div>
          {this.state.addinput.map((item, i) => {
            return (
              <>
                Address:{i + 1}
                <textarea
                  type="text"
                  name="Address"
                  placeholder="Enter Address"
                  onChange={(e) => this.storedHandler(e, item.id)}
                ></textarea>
                <br />
                <select name="country" onChange={(e) => this.storedHandler(e, item.id)}>
                  <option>--- country ---</option>
                  `<option>india</option>
                  `<option>usa</option>
                  `<option>england</option>
                  `<option>japan</option>
                </select>
                <br />
                <select name="state" onChange={(e) => this.storedHandler(e, item.id)}>
                  <option>--- State ---</option>
                  <option>gujarat</option>
                  <option>dubai</option>
                  <option>kerla</option>
                  <option>tokyogf</option>
                </select>
                <br />
                <select name="city" onChange={(e) => this.storedHandler(e, item.id)}>
                  <option>--- City ---</option>
                  <option>surat</option>
                  <option>mumbai</option>
                  <option>delhi</option>
                  <option>kolkata</option>
                </select>
                <br />
                {this.state.addinput.length > 1 && (
                  <button type="button" onClick={() => this.deletHandler(item)}>
                    Delete
                  </button>
                )}
                <br />
                <br />
              </>
            );
           })}
          <br />
          <button
            onClick={() => {
              this.addInput();
            }}
          >
            AddInput
          </button>
          <button onClick={()=>{this.setState({...this.state,isSubmit:this.state.isSubmit })}}>save</button>

        </div>
        <div>
          <table border="1px solid black">
            <th>Address</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>

            {this.state.isSubmit &&(  this.state.addinput.map((item) => {
              return (
                <>
                  <tr>
                    <td>{item.Address}</td>
                    <td>{item.country}</td>
                    <td>{item.state}</td>
                    <td>{item.city}</td>
                  </tr>
                </>
              );
            }))}
          </table>
        </div>
      </>
    );
  }
}
