import React, {Component} from "react";
import { formatDistanceToNow } from 'date-fns';

import './App.css';

import NewTaskForm from '../new-task-form';
import TaskList from "../task-list";
import Footer from "../footer";

export default class App extends Component {
    state = {
        todos: [{
            id: 1,
            description: 'Completed task',
            date: formatDistanceToNow(new Date(2014, 6, 2)),
            completed: true,
            editing: false,
        },
        {
            id: 2,
            description: 'Editing task',
            date: formatDistanceToNow(new Date(2014, 6, 2)),
            completed: false,
            editing: true,
        },
        {
            id: 3,
            description: 'Active task',
            date: formatDistanceToNow(new Date(2014, 6, 2)),
            completed: false,
            editing: false,
        }]
    }

    onDelete = (id) => {
        this.setState(({todos}) => ({todos: todos.filter(i => i.id !== id)}))
    }

    onComplete = (id) => {
        this.setState(({todos}) => {
            return {
                todos: todos.map(i =>  i.id === id ? {...i, completed: !i.completed}: i)
            }
        })
    }

    render() {
        return (
            <section className="todoapp">
                <NewTaskForm />
                <section className="main">
                    <TaskList state={this.state.todos}
                              onDelete={this.onDelete}
                    onComplete={this.onComplete}/>
                    <Footer/>
                </section>
            </section>
        );
    }

}
