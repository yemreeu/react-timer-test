import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Timer from './Timer';

describe('Timer Component', () => {
    it('should start the timer when the Start button is clicked', async () => {
        //Rendering the component and we get it by destructing the getByText function. This function allows us to select the component element containing a certain text.
        const { getByText, queryByText } = render(<Timer />);

        //looking for a button with the text 'Start'
        const startButton = getByText('Start');
      
        act(() => {
          fireEvent.click(startButton);  //clicking start button
          jest.advanceTimersByTime(1000); // 1 second advance timer
        });
      
        //We use await because the queryByText function is an asynchronous function.
        const timeDisplay = await queryByText(/(\d+):(\d+)/);// looking for any piece of text that contains the minute and second in the component with the help of regex. 

        //If an item containing certain text is found, the test will pass.
        expect(timeDisplay).toBeInTheDocument();
      });
      
  
      it('should stop the timer when the Stop button is clicked', async () => {
        const { getByText, queryByText } = render(<Timer />);
        const startButton = getByText('Start');
        const stopButton = getByText('Stop');
      
        act(() => {
          fireEvent.click(startButton);
          jest.advanceTimersByTime(1000);
          fireEvent.click(stopButton);
        });
      
        const timeDisplay = await queryByText(/(\d+):(\d+)/);
        expect(timeDisplay).toBeInTheDocument();
      });
  
    it('should reset the timer when the Reset button is clicked', () => {
      const { getByText } = render(<Timer />);
      const startButton = getByText('Start');
      const resetButton = getByText('Reset');
  
      act(() => {
        fireEvent.click(startButton);
        jest.advanceTimersByTime(1000);
        fireEvent.click(resetButton);
      });
  
      const timeDisplay = getByText('25:00');
      expect(timeDisplay).toBeInTheDocument();
    });

  });
  