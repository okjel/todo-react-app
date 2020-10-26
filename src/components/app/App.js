import React, {Component} from "react";
import { formatDistanceToNow } from 'date-fns';

import './App.css';

import NewTaskForm from '../new-task-form';
import TaskList from "../task-list";
import Footer from "../footer";

export default class App extends Component {

    ids = 0

    createElement = (text, completed = false, editing = false) => {
        return {
            id: this.ids++,
            description: text,
            date: formatDistanceToNow(new Date(2000 + Math.round(Math.random() * 10), 6, 2)),
            completed,
            editing,
        }
    }

    state = {
        todos: [
            this.createElement('Completed task'),
            this.createElement('Editing task'),
            this.createElement('Active task'),
        ],
        filtering: 'All'
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

    onAdd = (text) => {
        this.setState(({todos}) => {
            return {
                todos: [...todos, this.createElement(text)]
            };
        });
    }

    onFilter = (text) => {
        this.setState({
            filtering: text
        })
    }

    clearCompleted = () => {
        this.setState(({todos}) => {
            return {
                todos: todos.filter(i => !(i.completed))
            }
        })
    }

    render() {

        let todos;

        switch (this.state.filtering) {
            case "Active":
                todos = this.state.todos.filter(i => !(i.completed))
                break;
            case "Completed":
                todos = this.state.todos.filter(i => i.completed)
                break;
            default:
                todos = this.state.todos
        }

        return (
            <section className="todoapp">
                <NewTaskForm onAdd={this.onAdd}/>
                <section className="main">
                    <TaskList state={todos}
                              onDelete={this.onDelete}
                    onComplete={this.onComplete}/>
                    <Footer filtering={this.state.filtering}
                            onFilter={this.onFilter}
                            clearCompleted={this.clearCompleted}
                            activeTodos={this.state.todos.filter(i => !(i.completed)).length}/>
                </section>
            </section>
        );
    }

}
