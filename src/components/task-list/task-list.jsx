import React from 'react';
import PropTypes from 'prop-types';

import './task-list.css';
import Task from '../task';

export default function TaskList({ todosData, onDelete, onComplete, toggleEdit, onEdit }) {
  const todos = todosData.map(({ id, description, date, isEditing, completed }) => {
    let className = '';
    if (isEditing) {
      className += 'editing';
    }

    if (completed) {
      className += ' completed';
    }

    return (
      <li className={className} key={id}>
        <Task
          description={description}
          date={date}
          isEditing={isEditing}
          completed={completed}
          onDelete={() => onDelete(id)}
          onComplete={() => onComplete(id)}
          toggleEdit={() => toggleEdit(id)}
          onEdit={(text) => onEdit(id, text)}
        />
      </li>
    );
  });
  return <ul className="todo-list">{todos}</ul>;
}

TaskList.defaultProps = {
  todosData: [],
  onDelete: () => {},
  onComplete: () => {},
  toggleEdit: () => {},
  onEdit: () => {},
};

TaskList.propTypes = {
  todosData: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
