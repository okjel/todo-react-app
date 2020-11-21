/* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow, addSeconds, format } from 'date-fns';

export default function View({
  description,
  onEdit,
  toggleEdit,
  date,
  completed,
  isEditing,
  onDelete,
  onComplete,
  timer,
  startTimer,
  pauseTimer,
}) {
  const [descriptionInput, setDescription] = useState(description);

  const submitChange = (evt) => {
    evt.preventDefault();
    onEdit(descriptionInput);
    toggleEdit();
  };

  const onInputChange = (evt) => {
    setDescription(evt.target.value);
  };

  const formattedTime = (seconds) => {
    const helperDate = addSeconds(new Date(0), seconds);
    return format(helperDate, 'mm:ss');
  };

  return (
    <>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onComplete} checked={completed ? 'checked' : ''} />
        <label>
          <span className="title" onClick={onComplete}>
            {description}
          </span>
          <span className="description">
            <button type="button" aria-label="button play" className="icon icon-play" onClick={startTimer} />
            <button type="button" aria-label="button pause" className="icon icon-pause" onClick={pauseTimer} />
            {formattedTime(timer)}
          </span>
          <span className="description">{formatDistanceToNow(date, { includeSeconds: true })}</span>
        </label>
        <button type="button" aria-label="button edit" className="icon icon-edit" onClick={toggleEdit} />
        <button type="button" aria-label="button delete" className="icon icon-destroy" onClick={onDelete} />
      </div>
      {isEditing && (
        <form onSubmit={submitChange}>
          <input type="text" className="edit" onChange={onInputChange} value={descriptionInput} />
        </form>
      )}
    </>
  );
}

View.defaultProps = {
  date: new Date(),
  isEditing: false,
  toggleEdit: () => {},
  onEdit: () => {},
};

View.propTypes = {
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
