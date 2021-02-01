import React, { Component } from 'react'
import {Mycontext} from "./A"

export default class C extends Component {
    render() {
        return (
            <div>
                <Mycontext.Consumer>
                    {
                        ({name,handle})=><h1>Name :{name.name}</h1>
                    }
                </Mycontext.Consumer>
            </div>
        )
    }
}
