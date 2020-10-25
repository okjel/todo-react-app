import React from 'react';

import './task.css';

export default function Task({ description, date, onDelete, onComplete }) {
    return (
        <div className="view">
            <input className="toggle" type="checkbox" />
            <label>
                <span className="description" onClick={onComplete}>{description}</span>
                <span className="created">{date}</span>
            </label>
            <button className="icon icon-edit"></button>
            <button className="icon icon-destroy" onClick={onDelete}></button>
        </div>
    )
}