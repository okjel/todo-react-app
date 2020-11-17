import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filter from '../../shared/filter';

class Filters extends Component {
  static defaultProps = {
    filtering: Filter.all.name,
  };

  static propTypes = {
    onFilter: PropTypes.func.isRequired,
    filtering: PropTypes.string,
  };

  onClick = (evt) => {
    this.props.onFilter(evt.target.textContent);
  };

  render() {
    const filterElements = Object.keys(Filter).map((item) => (
      <li key={Filter[item].id}>
        <button
          type="button"
          className={Filter[item].name === this.props.filtering ? 'selected' : ''}
          onClick={this.onClick}
        >
          {Filter[item].name}
        </button>
      </li>
    ));

    return <ul className="filters">{filterElements}</ul>;
  }
}

export default Filters;
