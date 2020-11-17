/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import './header.css';
import PropTypes from 'prop-types';

class Header extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };

  state = {
    inputText: '',
    inputMin: '',
    inputSec: '',
  };

  onChangeInputText = (evt) => {
    this.setState({
      inputText: evt.target.value,
    });
  };

  onChangeInputMin = (evt) => {
    this.setState({
      inputMin: evt.target.value,
    });
  };

  onChangeInputSec = (evt) => {
    this.setState({
      inputSec: evt.target.value,
    });
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    if (!this.state.inputText) return;
    const timer = +this.state.inputMin * 60 + +this.state.inputSec;
    this.props.onAdd(this.state.inputText, timer);
    this.setState({
      inputText: '',
      inputMin: '',
      inputSec: '',
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="Task"
            onChange={this.onChangeInputText}
            value={this.state.inputText}
            autoFocus
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            type="number"
            onChange={this.onChangeInputMin}
            value={this.state.inputMin}
            max="59"
            required
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            type="number"
            max="59"
            onChange={this.onChangeInputSec}
            value={this.state.inputSec}
            required
          />
          <input type="submit" style={{ visibility: 'hidden' }} />
        </form>
      </header>
    );
  }
}

export default Header;
