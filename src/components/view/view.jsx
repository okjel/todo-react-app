/* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow, addSeconds, format } from 'date-fns';

class View extends Component {
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
    startTimer: PropTypes.func.isRequired,
    pauseTimer: PropTypes.func.isRequired,
    timer: PropTypes.number.isRequired,
  };

  state = {
    description: this.props.description,
    // ok: 'name',
  };

  // componentWillUnmount() {
  //   this.props.onDelete();
  // }

  submitChange = (evt) => {
    evt.preventDefault();
    this.props.onEdit(this.state.description);
    this.props.toggleEdit();
  };

  onInputChange = (evt) => {
    // eslint-disable-next-line no-unused-vars
    this.setState((state) => ({
      description: evt.target.value,
    }));
  };

  formattedTime(seconds) {
    const helperDate = addSeconds(new Date(0), seconds);
    return format(helperDate, 'mm:ss');
  }

  render() {
    const { date, completed, isEditing, onDelete, onComplete, toggleEdit, timer, startTimer, pauseTimer } = this.props;

    return (
      <>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onComplete} checked={completed ? 'checked' : ''} />
          <label>
            <span className="title" onClick={onComplete}>
              {this.state.description}
            </span>
            <span className="description">
              <button type="button" aria-label="button play" className="icon icon-play" onClick={startTimer} />
              <button type="button" aria-label="button pause" className="icon icon-pause" onClick={pauseTimer} />
              {this.formattedTime(timer)}
            </span>
            <span className="description">{formatDistanceToNow(date, { includeSeconds: true })}</span>
          </label>
          <button type="button" aria-label="button edit" className="icon icon-edit" onClick={toggleEdit} />
          <button type="button" aria-label="button delete" className="icon icon-destroy" onClick={onDelete} />
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

export default View;
