import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };

  state = {
    inputText: '',
  };

  onInputChange = (evt) => {
    this.setState({
      inputText: evt.target.value,
    });
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    if (!this.state.inputText) return;
    this.props.onAdd(this.state.inputText);
    this.setState({
      inputText: '',
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onInputChange}
            value={this.state.inputText}
          />
        </form>
      </header>
    );
  }
}
