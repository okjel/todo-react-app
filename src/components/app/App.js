import React from "react";
import { formatDistanceToNow } from 'date-fns';

import './App.css';

import NewTaskForm from '../new-task-form';
import TaskList from "../task-list";
import Footer from "../footer";

function App() {
    const data = [
        {
            description: 'Completed task',
            date: formatDistanceToNow(new Date(2014, 6, 2)),
            completed: true,
            editing: false,
        },
        {
            description: 'Editing task',
            date: formatDistanceToNow(new Date(2014, 6, 2)),
            completed: false,
            editing: true,
        },
        {
            description: 'Active task',
            date: formatDistanceToNow(new Date(2014, 6, 2)),
            completed: false,
            editing: false,
        },
    ]

  return (
      <section className="todoapp">
        <NewTaskForm />
        <section className="main">
          <TaskList data={data} />
          <Footer/>
        </section>
      </section>
  );
}

export default App;
