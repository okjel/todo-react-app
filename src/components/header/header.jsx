/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import './header.css';
import PropTypes from 'prop-types';

export default function Header({ onAdd }) {
  const [inputText, setInputText] = useState('');
  const [timeMin, setTimeMin] = useState('');
  const [timeSec, setTimeSec] = useState('');

  const onChangeInputText = (evt) => {
    setInputText(evt.target.value);
  };

  const onChangeInputMin = (evt) => {
    setTimeMin(evt.target.value);
  };

  const onChangeInputSec = (evt) => {
    setTimeSec(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (!inputText) return;
    const timer = +timeMin * 60 + +timeSec;
    onAdd(inputText, timer);
    setInputText('');
    setTimeMin('');
    setTimeSec('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input className="new-todo" placeholder="Task" onChange={onChangeInputText} value={inputText} autoFocus />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          onChange={onChangeInputMin}
          value={timeMin}
          max="59"
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="number"
          max="59"
          onChange={onChangeInputSec}
          value={timeSec}
          required
        />
        <input type="submit" style={{ visibility: 'hidden' }} />
      </form>
    </header>
  );
}

Header.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
