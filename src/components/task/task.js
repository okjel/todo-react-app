import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './task.css';
import {formatDistanceToNow} from "date-fns";

export default class Task extends Component {

    static defaultProps = {
        description: "task",
        date: new Date(),
        completed: false,
        isEditing: false,
        onDelete: () => {},
        onComplete: () => {},
        toggleEdit: () => {},
        onEdit: () => {},
    }

    static propTypes = {
        description: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
        completed: PropTypes.bool.isRequired,
        isEditing: PropTypes.bool.isRequired,
        onDelete: PropTypes.func.isRequired,
        onComplete: PropTypes.func.isRequired,
        toggleEdit: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,
    }

    state = {
        description: this.props.description,
    }

    submitChange = (e) => {
        e.preventDefault();
        this.props.onEdit(this.state.description);
        this.props.toggleEdit();
    }

    onInputChange = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    render() {
        const { date, completed, isEditing, onDelete, onComplete, toggleEdit } = this.props;
        return (
            <>
                <div className="view">
                    <input className="toggle" type="checkbox" onChange={onComplete} checked={completed ? "checked" : ""}/>
                    <label>
                        <span className="description" onClick={onComplete}>{this.state.description}</span>
                        <span className="created">{formatDistanceToNow(date, {includeSeconds: true})}</span>
                    </label>
                    <button className="icon icon-edit" onClick={toggleEdit}/>
                    <button className="icon icon-destroy" onClick={onDelete}/>
                </div>
                {isEditing && (
                    <form onSubmit={this.submitChange}>
                        <input type="text"
                               className="edit"
                               onChange={this.onInputChange}
                               value={this.state.description}/>
                    </form>)}
            </>
        )
    }
}
