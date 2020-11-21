import React from 'react';
import PropTypes from 'prop-types';
import Filter from '../../shared/filter';

export default function Filters({ filtering, onFilter }) {
  const onClick = (evt) => {
    onFilter(evt.target.textContent);
  };

  const filterElements = Object.keys(Filter).map((item) => (
    <li key={Filter[item].id}>
      <button type="button" className={Filter[item].name === filtering ? 'selected' : ''} onClick={onClick}>
        {Filter[item].name}
      </button>
    </li>
  ));

  return <ul className="filters">{filterElements}</ul>;
}

Filters.defaultProps = {
  filtering: Filter.all.name,
};

Filters.propTypes = {
  onFilter: PropTypes.func.isRequired,
  filtering: PropTypes.string,
};
