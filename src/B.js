import React, { Component } from 'react'
import { Mycontext } from './A'
import C from './C'

export default class B extends Component {

    render() {
        return (
            <>
            <C/>
            <Mycontext.Consumer>
                     {({name,handle})=>  
                     {
                       return  <button onClick={handle} type="button">Change</button>
                     }}
            </Mycontext.Consumer>
           </>
       
        )
    }
}
