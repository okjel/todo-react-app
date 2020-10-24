import React from 'react';
import './task-list.css';
import Task from "../task";

export default function TaskList({ data }) {
    console.log(data);
    const todos = data.map( item => {
        const {editing, completed, ...options} = item;

        if (editing) {
            return (
                <li className="editing">
                    <Task {...options}/>
                    <input type="text" className="edit" value="Editing task" />
                </li>
            )
        }

        if (completed) {
            return (
                <li className="completed">
                    <Task {...options}/>
                </li>
            )
        }

        return (
            <li>
                <Task {...options}/>
            </li>
        )
    });

    return (
        <ul className="todo-list">
            { todos }
        </ul>
    )
}