import React from 'react';
import PropTypes from 'prop-types';

import './footer.css';
import TasksFilter from '../tasks-filter';

export default function Footer({ activeTodos, clearCompleted, ...filterProps }) {
  return (
    <footer className="footer">
      <span className="todo-count">{activeTodos} items left</span>
      <TasksFilter {...filterProps} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  activeTodos: PropTypes.node.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};
