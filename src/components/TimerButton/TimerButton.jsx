import React from 'react';
import PropTypes from 'prop-types';
import './TimerButton.css';

const TimerButton = ({ buttonAction, buttonValue, dataTestId}) => (
  <div className="button-container" onClick={() => buttonAction()}>
    <p className="button-value" data-testid={dataTestId}>{buttonValue}</p>
  </div>
);

TimerButton.propTypes = {
  buttonAction: PropTypes.func.isRequired,
  buttonValue: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
};

export default TimerButton;
