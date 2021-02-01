import React, { Component } from 'react';
import './Todoapp.css';
import ListItems from './Listitems'
import {library} from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import { logDOM } from '@testing-library/react';

library.add(faTrash);

export default class Todoapp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             items:[],
             currentItem:{
                 text:'',
                 key:''
             }
        }
    }
    handleInput=(e)=>{
        this.setState({
            currentItem:{
                text:e.target.value,
                key:Date.now()
            }
        })
    }
    addItem=(e)=>{
        e.preventDefault();
        const newItem = this.state.currentItem;
        console.log(newItem);
        if(newItem.text !== ""){
            const newItems = [...this.state.items,newItem];
            this.setState({
                items:newItems,
                currentItem:{
                    text:'',
                    key:''
                }
            })
        }
    }
    deletItem=(key)=>{
     const deletitem= this.state.items.filter((item)=>{
            return item.key!==key;
        })
        this.setState({
            items:deletitem
        })
    }
    setUpdate=(text,key)=>{
        const items = this.state.items;
        items.map(item=>{
            if(item.key === key){
                item.text=text;
            }
        })
        this.setState({
            items:items
        })
    }
    render() {
        return (
          <div className="todo">
                <header>
                <form onSubmit={this.addItem}>
                <input type="text" id="todoformInput" placeholder="Enter your name" value={this.state.currentItem.text} onChange={this.handleInput}/>   
                <button type="submit" id="todoformbtn">Submit</button>
                </form>
            </header>
            <ListItems items={this.state.items} deletItem={this.deletItem}
                        setUpdate={this.setUpdate}></ListItems>
          </div>
        )
    }
}
