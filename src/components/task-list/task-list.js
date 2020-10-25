import React from 'react';
import './task-list.css';
import Task from "../task";

export default function TaskList({ state, onDelete, onComplete}) {

    const todos = state.map( ({id, editing, completed, ...options}) => {
        let className = "";
        if(editing){
            className += " editing";
        }

        if(completed){
            className += " completed";
        }

        return (
            <li className={className} key={id}>
                <Task {...options} onDelete={() => onDelete(id)} onComplete={() => onComplete(id)}/>
                {editing && <input type="text" className="edit" defaultValue="Editing task" />}
            </li>
        )
    });

    return (
        <ul className="todo-list">
            { todos }
        </ul>
    )
}