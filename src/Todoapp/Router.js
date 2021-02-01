import React, { Component } from 'react'
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router-dom';
import Login from './Login';
import Logout    from './Logout'
import Task from './Task'

export default class Router extends Component {
    render() {
        return (
           <>
            <Switch>
                <Route  path="/" component={Login}/>
                <Route  path="/task" component={Task}/>
                <Route  path="/logout" component={Logout}/>
            </Switch>
           </>
        )
    }
}
    