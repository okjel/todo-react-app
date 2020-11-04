import React, { Component } from 'react';

import './App.css';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';
import Filter from '../../shared/filter';

export default class App extends Component {
  ids = 0;

  createElement = (text) => ({
    id: this.ids++,
    description: text,
    date: new Date(),
    completed: false,
    isEditing: false,
  });

  state = {
    todos: [
      this.createElement('Completed task'),
      this.createElement('Editing task'),
      this.createElement('Active task'),
    ],
    filtering: Filter.all.name,
  };

  onDelete = (id) => {
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
