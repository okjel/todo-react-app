import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './task.css';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  static defaultProps = {
    date: new Date(),
    isEditing: false,
    toggleEdit: () => {},
    onEdit: () => {},
  };

  static propTypes = {
    description: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
    completed: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool,
    onDelete: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func,
    onEdit: PropTypes.func,
  };

  state = {
    description: this.props.description,
  };

  submitChange = (evt) => {
    evt.preventDefault();
    this.props.onEdit(this.state.description);
    this.props.toggleEdit();
  };

  onInputChange = (evt) => {
    this.setState({
      description: evt.target.value,
    });
  };

  render() {
    const { date, completed, isEditing, onDelete, onComplete, toggleEdit } = this.props;
    return (
      <>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onComplete} checked={completed ? 'checked' : ''} />
          <label>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <span className="description" onClick={onComplete}>
              {this.state.description}
            </span>
            <span className="created">{formatDistanceToNow(date, { includeSeconds: true })}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={toggleEdit} aria-label="Edit task" />
          <button type="button" className="icon icon-destroy" onClick={onDelete} aria-label="Delete task" />
        </div>
        {isEditing && (
          <form onSubmit={this.submitChange}>
            <input type="text" className="edit" onChange={this.onInputChange} value={this.state.description} />
          </form>
        )}
      </>
    );
  }
}
