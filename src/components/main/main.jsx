/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoList from '../todo-list';
import Footer from '../footer';

class Main extends Component {
  state = {};

  render() {
    const {
      todosData,
      onDelete,
      onComplete,
      onEdit,
      toggleEdit,
      filtering,
      onFilter,
      clearCompleted,
      startTimer,
      pauseTimer,
      countActive,
    } = this.props;

    return (
      <section className="main">
        <TodoList
          todosData={todosData}
          onDelete={onDelete}
          onComplete={onComplete}
          onEdit={onEdit}
          toggleEdit={toggleEdit}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
        />
        <Footer filtering={filtering} onFilter={onFilter} clearCompleted={clearCompleted} countActive={countActive} />
      </section>
    );
  }
}

Main.propTypes = {
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
  filtering: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  countActive: PropTypes.number.isRequired,
  startTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired,
};

export default Main;
