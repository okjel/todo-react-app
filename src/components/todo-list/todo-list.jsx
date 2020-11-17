/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './todo-list.css';
import PropTypes from 'prop-types';
import View from '../view';

function TodoList({ todosData, onDelete, onComplete, toggleEdit, onEdit, startTimer, pauseTimer }) {
  const todos = todosData.map(({ id, description, date, timer, isEditing, completed }) => {
    let className = '';
    if (isEditing) {
      className += 'editing';
    }

    if (completed) {
      className += ' completed';
    }

    return (
      <li className={className} key={id}>
        <View
          timer={timer.time}
          description={description}
          date={date}
          isEditing={isEditing}
          completed={completed}
          onDelete={() => onDelete(id)}
          onComplete={() => onComplete(id)}
          toggleEdit={() => toggleEdit(id)}
          startTimer={() => startTimer(id)}
          pauseTimer={() => pauseTimer(id)}
          onEdit={(text) => onEdit(id, text)}
        />
      </li>
    );
  });

  return <ul className="todo-list">{todos}</ul>;
}

TodoList.propTypes = {
  todosData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      date: PropTypes.instanceOf(Date),
      completed: PropTypes.bool,
      isEditing: PropTypes.bool,
      timer: PropTypes.shape({
        time: PropTypes.number,
        intervalId: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.oneOf([null]).isRequired]),
      }),
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired,
};

export default TodoList;
