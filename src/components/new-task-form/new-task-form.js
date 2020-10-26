import React, { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {

    state = {
        inputText: ''
    }

    onInputChange = (e) => {
        this.setState({
            inputText: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.inputText) return;
        this.props.onAdd(this.state.inputText);
        this.setState({
            inputText: ''
        })
    }

    render() {

        return (
            <header className="header">
                <h1>todos</h1>
                <form onSubmit={this.onSubmit}>
                <input className="new-todo" placeholder="What needs to be done?" autoFocus
                       onChange={this.onInputChange}
                       value={this.state.inputText}/>
                </form>
            </header>
        )
    }
}