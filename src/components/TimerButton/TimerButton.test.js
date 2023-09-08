import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TimerButton from './TimerButton';
import '@testing-library/jest-dom/extend-expect';


describe('TimerButton Component', () => {
  test('renders with buttonValue and calls buttonAction on click', () => {
    
    const mockButtonAction = jest.fn();

    // Define buttonValue and dataTestId
    const buttonValue = 'Start';
    const dataTestId = 'start-button';

    // Render the TimerButton
    const { getByText } = render(
      <TimerButton
        buttonAction={mockButtonAction}
        buttonValue={buttonValue}
        dataTestId={dataTestId}
      />
    );

    // Check if the buttonValue is rendered
    const buttonElement = getByText(buttonValue);
    expect(buttonElement).toBeInTheDocument();

    // Simulate a button click
    fireEvent.click(buttonElement);

    // Check if buttonAction is called
    expect(mockButtonAction).toHaveBeenCalled();
  });

  test('has the correct data-testid', () => {
    // Mocking buttonAction function
    const mockButtonAction = jest.fn();

    // Define buttonValue and dataTestId
    const buttonValue = 'Stop';
    const dataTestId = 'stop-button';

    // Render the TimerButton component
    const { getByTestId } = render(
      <TimerButton
        buttonAction={mockButtonAction}
        buttonValue={buttonValue}
        dataTestId={dataTestId}
      />
    );

    // Check if the data-testid is set correctly
    const buttonElement = getByTestId(dataTestId);
    expect(buttonElement).toBeInTheDocument();
  });
});
