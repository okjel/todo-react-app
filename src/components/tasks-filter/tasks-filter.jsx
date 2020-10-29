import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './tasks-filter.css';

export default class TasksFilter extends Component {
  static defaultProps = {
    filtering: 'All',
  };

  static propTypes = {
    onFilter: PropTypes.func.isRequired,
    filtering: PropTypes.string,
  };

  state = {
    filters: [
      { id: 1, name: 'All' },
      { id: 2, name: 'Active' },
      { id: 3, name: 'Completed' },
    ],
  };

  onClick = (evt) => {
    this.props.onFilter(evt.target.textContent);
  };

  render() {
    const filterElements = this.state.filters.map((item) => (
      <li key={item.id}>
        <button type="button" className={item.name === this.props.filtering ? 'selected' : ''} onClick={this.onClick}>
          {item.name}
        </button>
      </li>
    ));

    return <ul className="filters">{filterElements}</ul>;
  }
}
