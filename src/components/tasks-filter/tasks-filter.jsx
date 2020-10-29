import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './tasks-filter.css';

export default class TasksFilter extends Component {
  static defaultProps = {
    onFilter: () => {},
    filtering: 'All',
  };

  static propTypes = {
    onFilter: PropTypes.func.isRequired,
    filtering: PropTypes.string,
  };

  state = {
    filters: ['All', 'Active', 'Completed'],
  };

  onClick = (e) => {
    this.props.onFilter(e.target.textContent);
  };

  render() {
    const filterElements = this.state.filters.map((item, index) => (
      <li key={index}>
        <button className={item === this.props.filtering ? 'selected' : ''} onClick={this.onClick}>
          {item}
        </button>
      </li>
    ));

    return <ul className="filters">{filterElements}</ul>;
  }
}
