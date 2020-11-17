import React from 'react';
import PropTypes from 'prop-types';

import './footer.css';
import Filters from '../filters';

export default function Footer({ countActive, clearCompleted, ...filterProps }) {
  return (
    <footer className="footer">
      <span className="todo-count">{countActive} items left</span>
      <Filters {...filterProps} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  filtering: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  countActive: PropTypes.number.isRequired,
};
