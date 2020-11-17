import React, { Component } from 'react';

import './App.css';
import Filter from '../../shared/filter';
import Header from '../header';
import Main from '../main';
import jsonDate from '../../shared/json-date';

export default class App extends Component {
  ids = 0;

  createElement = (text, timer = 0) => {
    const todo = {
      id: this.ids++,
      description: text,
      date: new Date(),
      completed: false,
      isEditing: false,
      timer: { time: +timer, intervalId: null },
    };

    return todo;
  };

  componentDidMount() {
    window.addEventListener('storage', this.checkStorage);
  }

  checkStorage = () => {
    const todosData = localStorage.getItem('todosTimers');
    if (!todosData || JSON.stringify(this.state) === todosData) return;
    jsonDate();
    this.setState(JSON.parse(todosData, JSON.dateParser));
  };

  componentDidUpdate() {
    localStorage.setItem('todosTimers', JSON.stringify(this.state));
  }

  state = {
    todos: [
      this.createElement('Completed task'),
      this.createElement('Editing task'),
      this.createElement('Active task'),
    ],
    filtering: Filter.all.name,
  };

  onDelete = (id) => {
    // const todo = this.state.todos.find((i) => i.id === id);
    // if (todo) {
    //   const interId = todo.timer.intervalId;
    //   if (interId) this.pauseTimer(id);
    // }
    this.setState(({ todos }) => ({ todos: todos.filter((i) => i.id !== id) }));
  };

  onEdit = (id, text) => {
    this.setState(({ todos }) => ({
      todos: todos.map((el) => (el.id === id ? { ...el, description: text } : el)),
    }));
  };

  toggleProp = (state, nameProp, elId) => {
    return state.map((el) => (el.id === elId ? { ...el, [nameProp]: !el[nameProp] } : el));
  };

  toggleEdit = (id) => {
    this.setState(({ todos }) => ({ todos: this.toggleProp(todos, 'isEditing', id) }));
  };

  onComplete = (id) => {
    this.setState(({ todos }) => ({ todos: this.toggleProp(todos, 'completed', id) }));
  };

  onAdd = (text, timer) => {
    this.setState(({ todos }) => ({
      todos: [...todos, this.createElement(text, timer)],
    }));
  };

  onFilter = (text) => {
    this.setState({
      filtering: text,
    });
  };

  clearCompleted = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter((i) => !i.completed),
    }));
  };

  minusTimerSec = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo) => {
        if (todo.id !== id) return todo;
        if (todo.timer.time < 1) {
          clearInterval(todo.timer.intervalId);
          return { ...todo, timer: { ...todo.timer, intervalId: null } };
        }

        return { ...todo, timer: { ...todo.timer, time: todo.timer.time - 1 } };
      }),
    }));
  };

  startTimer = (id) => {
    const intervalId = setInterval(() => this.minusTimerSec(id), 1000);
    this.setState(({ todos }) => ({
      todos: todos.map((todo) => (todo.id === id ? { ...todo, timer: { ...todo.timer, intervalId } } : todo)),
    }));
  };

  pauseTimer = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo) => {
        if (todo.id !== id || todo.timer.intervalId === null) {
          return todo;
        }
        clearInterval(todo.timer.intervalId);
        return { ...todo, timer: { ...todo.timer, intervalId: null } };
      }),
    }));
  };

  isFilter = (filterName) => this.state.filtering === filterName;

  render() {
    const todos = this.state.todos.filter((i) => {
      if (this.isFilter(Filter.active.name)) {
        return !i.completed;
      }

      if (this.isFilter(Filter.completed.name)) {
        return i.completed;
      }

      return true;
    });

    return (
      <section className="todoapp">
        <Header onAdd={this.onAdd} />
        <Main
          todosData={todos}
          filtering={this.state.filtering}
          onDelete={this.onDelete}
          onComplete={this.onComplete}
          onEdit={this.onEdit}
          toggleEdit={this.toggleEdit}
          onFilter={this.onFilter}
          clearCompleted={this.clearCompleted}
          startTimer={this.startTimer}
          pauseTimer={this.pauseTimer}
          countActive={this.state.todos.filter((i) => !i.completed).length}
        />
      </section>
    );
  }
}
