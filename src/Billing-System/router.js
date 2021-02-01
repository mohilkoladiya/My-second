import React from 'react'
import Switch from 'react-bootstrap/esm/Switch'
import { Route } from 'react-router-dom'
import Bill from './bill'
import Invoice from './Invoice'

export default function router() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Bill}/>
                <Route exact path="/invoice" component={Invoice}/>
            </Switch>
        </div>
    )
}
