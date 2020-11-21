import React, { useEffect, useState, useCallback } from 'react';

import './App.css';
import Filter from '../../shared/filter';
import Header from '../header';
import Main from '../main';
import jsonDate from '../../shared/json-date';

export default function App() {
  let ids = 0;

  const createElement = (text, timer = 0) => {
    return {
      id: ids++,
      description: text,
      date: new Date(),
      completed: false,
      isEditing: false,
      timer: { time: +timer, intervalId: null },
    };
  };

  const [todoItems, setTodoItems] = useState([
    createElement('Completed task'),
    createElement('Editing task'),
    createElement('Active task'),
  ]);

  const [filter, setFilter] = useState(Filter.all.name);

  const syncStorage = useCallback(() => {
    const todosData = localStorage.getItem('todosTimers');
    if (!todosData || JSON.stringify(todoItems) === todosData) return;
    jsonDate();
    setTodoItems(JSON.parse(todosData, JSON.dateParser));
  }, [todoItems]);

  useEffect(() => {
    window.addEventListener('storage', syncStorage);
    localStorage.setItem('todosTimers', JSON.stringify(todoItems));
    return () => window.removeEventListener('storage', syncStorage);
  });

  const onDelete = (id) => {
    setTodoItems((todos) => [...todos.filter((i) => i.id !== id)]);
  };

  const onEdit = (id, text) => {
    setTodoItems((todos) => [...todos.map((el) => (el.id === id ? { ...el, description: text } : el))]);
  };

  const toggleProp = (nameProp, elId) => {
    setTodoItems((todos) => [...todos.map((el) => (el.id === elId ? { ...el, [nameProp]: !el[nameProp] } : el))]);
  };

  const toggleEdit = (id) => {
    toggleProp('isEditing', id);
  };

  const onComplete = (id) => {
    toggleProp('completed', id);
  };

  const onAdd = (text, timer) => {
    setTodoItems((todos) => [...todos, createElement(text, timer)]);
  };

  const onFilter = (text) => {
    setFilter(text);
  };

  const clearCompleted = () => {
    setTodoItems((todos) => [...todos.filter((i) => !i.completed)]);
  };

  const minusTimerSec = (id) => {
    setTodoItems((todos) => [
      ...todos.map((todo) => {
        if (todo.id !== id) return todo;
        if (todo.timer.time < 1) {
          clearInterval(todo.timer.intervalId);
          return { ...todo, timer: { ...todo.timer, intervalId: null } };
        }

        return { ...todo, timer: { ...todo.timer, time: todo.timer.time - 1 } };
      }),
    ]);
  };

  const startTimer = (id) => {
    const curTask = todoItems.find((todo) => todo.id === id);
    if (!curTask || curTask.timer.intervalId) return;
    const intervalId = setInterval(() => minusTimerSec(id), 1000);
    setTodoItems((todos) => [
      ...todos.map((todo) => (todo.id === id ? { ...todo, timer: { ...todo.timer, intervalId } } : todo)),
    ]);
  };

  const pauseTimer = (id) => {
    setTodoItems((todos) => [
      ...todos.map((todo) => {
        if (todo.id !== id || todo.timer.intervalId === null) {
          return todo;
        }
        clearInterval(todo.timer.intervalId);
        return { ...todo, timer: { ...todo.timer, intervalId: null } };
      }),
    ]);
  };

  const isFilter = (filterName) => filter === filterName;

  const todos = todoItems.filter((i) => {
    if (isFilter(Filter.active.name)) {
      return !i.completed;
    }

    if (isFilter(Filter.completed.name)) {
      return i.completed;
    }

    return true;
  });

  return (
    <section className="todoapp">
      <Header onAdd={onAdd} />
      <Main
        todosData={todos}
        filtering={filter}
        onDelete={onDelete}
        onComplete={onComplete}
        onEdit={onEdit}
        toggleEdit={toggleEdit}
        onFilter={onFilter}
        clearCompleted={clearCompleted}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        countActive={todoItems.filter((i) => !i.completed).length}
      />
    </section>
  );
}
