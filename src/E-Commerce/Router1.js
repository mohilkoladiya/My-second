import React  from 'react'
import Switch from 'react-bootstrap/esm/Switch'
import { Route } from 'react-router-dom'
import Login1 from './Login1';
import Admin from './Admin'
import Logout1 from './Logout1';
import Custumer from './Custumer';
import Cartitem from './Cartitem';

function Router1() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Login1}/>  
                <Route exact path="/Admin" component={Admin}/>  
                <Route exact path="/Custumer" component={Custumer}/>  
                <Route exact path="/Logout1" component={Logout1}/>  
                <Route exact path="/Cartitem" component={Cartitem}/>  
            </Switch>
        </>            
    )
}

export default Router1
