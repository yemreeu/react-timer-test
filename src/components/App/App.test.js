import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('App Component', () => {
    it('should render the Timer component with all buttons and initial time 25:00', () => {
      //Rendering the component and we get it by destructing the getByText function. This function allows us to select the component element containing a certain text.
      const { getByText } = render(<App />);
      
      //looking for a button with the text 'Start','Stop''Reset','25:00'.
      const startButton = getByText('Start');
      const stopButton = getByText('Stop');
      const resetButton = getByText('Reset');
      const initialTime = getByText('25:00'); // Initial time
      
      //Checks if elements containing expected texts
      expect(startButton).toBeInTheDocument();
      expect(stopButton).toBeInTheDocument();
      expect(resetButton).toBeInTheDocument();
      expect(initialTime).toBeInTheDocument();
    });
  });