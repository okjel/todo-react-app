import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

export default class App extends Component {
  static defaultProps = {
    filter: 'All',
  };

  static propTypes = {
    filter: PropTypes.string,
  };

  ids = 0;

  createElement = (text, completed = false, isEditing = false) => ({
    id: this.ids + 1,
    description: text,
    date: new Date(),
    completed,
    isEditing,
  });

  state = {
    todos: [
      this.createElement('Completed task'),
      this.createElement('Editing task'),
      this.createElement('Active task'),
    ],
    filtering: this.props.filter,
  };

  onDelete = (id) => {
    this.setState(({ todos }) => ({ todos: todos.filter((i) => i.id !== id) }));
  };

  onEdit = (id, text) => {
    this.setState(({ todos }) => ({
      todos: todos.reduce((acc, el) => (el.id === id ? [...acc, { ...el, description: text }] : [...acc, el]), []),
    }));
  };

  toggleEdit = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.reduce(
        (acc, el) => (el.id === id ? [...acc, { ...el, isEditing: !el.isEditing }] : [...acc, el]),
        []
      ),
    }));
  };

  onComplete = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i)),
    }));
  };

  onAdd = (text) => {
    this.setState(({ todos }) => ({
      todos: [...todos, this.createElement(text)],
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

  render() {
    let todos;

    switch (this.state.filtering) {
      case 'Active':
        todos = this.state.todos.filter((i) => !i.completed);
        break;
      case 'Completed':
        todos = this.state.todos.filter((i) => i.completed);
        break;
      default:
        todos = this.state.todos;
    }

    return (
      <section className="todoapp">
        <NewTaskForm onAdd={this.onAdd} />
        <section className="main">
          <TaskList
            todosData={todos}
            onDelete={this.onDelete}
            onComplete={this.onComplete}
            onEdit={this.onEdit}
            toggleEdit={this.toggleEdit}
          />
          <Footer
            filtering={this.state.filtering}
            onFilter={this.onFilter}
            clearCompleted={this.clearCompleted}
            activeTodos={this.state.todos.filter((i) => !i.completed).length}
          />
        </section>
      </section>
    );
  }
}
