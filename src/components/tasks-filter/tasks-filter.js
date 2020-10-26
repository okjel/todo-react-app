import React, { Component } from 'react';

import './tasks-filter.css';

export default class TasksFilter extends Component {

    state = {
        filters: [
            "All",
            "Active",
            "Completed",
        ]
    }

    onClick = (e) => {
        this.props.onFilter(e.target.textContent);
    }

    render() {
        const filterElements = this.state.filters.map((item, index) => {
            return (
                <li key={index}>
                    <button className={ item === this.props.filtering ? "selected" : ""} onClick={this.onClick}>{item}</button>
                </li>
            )
        })

        return (
            <ul className="filters">
                {filterElements}
            </ul>
        )
    }
}