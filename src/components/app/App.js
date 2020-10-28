import React, {Component} from "react";

import './App.css';

import NewTaskForm from '../new-task-form';
import TaskList from "../task-list";
import Footer from "../footer";

export default class App extends Component {

    ids = 0

    static defaultProps = {
        filter: "All"
    }

    createElement = (text, completed = false, isEditing = false) => {
        return {
            id: this.ids++,
            description: text,
            date: new Date(),
            completed,
            isEditing,
        }
    }

    state = {
        todos: [
            this.createElement('Completed task'),
            this.createElement('Editing task'),
            this.createElement('Active task'),
        ],
        filtering: this.props.filter
    }

    onDelete = (id) => {
        this.setState(({todos}) => ({todos: todos.filter(i => i.id !== id)}))
    }

    onEdit = (id, text) => {
        this.setState(({todos}) => {
            return {
                todos: todos.reduce((a, el) => el.id === id ? [...a, {...el, description: text}] : [...a, el], [])
            };
        });
    }

    toggleEdit = (id) => {
        this.setState(({todos}) => {
            return {
                todos: todos.reduce((a, el) => el.id === id ? [...a, {...el, isEditing: !el.isEditing}] : [...a, el], [])
            };
        });
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
                    <TaskList todosData={todos}
                              onDelete={this.onDelete}
                              onComplete={this.onComplete}
                              onEdit={this.onEdit}
                              toggleEdit={this.toggleEdit}/>
                    <Footer filtering={this.state.filtering}
                            onFilter={this.onFilter}
                            clearCompleted={this.clearCompleted}
                            activeTodos={this.state.todos.filter(i => !(i.completed)).length}/>
                </section>
            </section>
        );
    }

}
