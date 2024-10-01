import { expect, test } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Home from './app/page';
import '@testing-library/jest-dom';
import { Model } from './model';
import React from 'react';

// Test the initial render of the Home component
test('Home component renders correctly', async () => {
  const { getByText } = render(React.createElement(Home));
  
  // Check for initial state labels
  const movesElement = getByText(/Moves: 0/i);
  const scoreElement = getByText(/Score: 0/i);
  
  expect(movesElement).toBeDefined();
  expect(scoreElement).toBeDefined();

  cleanup();
});

// // Test swapping syllables and score increment
// test('Swap syllables and update score', async () => {
//   const { getByTestId, getByText } = render(React.createElement(Home));

//   const swapButton = getByTestId('swap');
//   const numMovesLabel = getByText(/Moves: 0/i);
//   const scoreLabel = getByText(/Score: 0/i);

//   // Swap button should be disabled initially since no syllables are selected
//   expect(swapButton).toBeDisabled();

//   // Mock a syllable selection event to simulate the user selecting syllables
//   const firstSyllableButton = getByText(/un/); 
//   fireEvent.click(firstSyllableButton);

//   const secondSyllableButton = getByText(/der/);
//   fireEvent.click(secondSyllableButton);

//   // Now, the swap button should be enabled
//   expect(swapButton).not.toBeDisabled();

//   // Perform the swap
//   fireEvent.click(swapButton);

//   // Check if moves and score have updated
//   expect(numMovesLabel.textContent).toBe('Moves: 1');
//   expect(scoreLabel.textContent).not.toBe('Score: 0');

//   cleanup();
// });

// // Test reset button functionality
// test('Reset puzzle', async () => {
//   const { getByTestId, getByText } = render(React.createElement(Home));

//   const resetButton = getByTestId('reset');
//   const numMovesLabel = getByText(/Moves: 0/i);
//   const scoreLabel = getByText(/Score: 0/i);

//   // Perform some moves before reset
//   const firstSyllableButton = getByText(/un/); // Replace with actual syllable text
//   fireEvent.click(firstSyllableButton);

//   const secondSyllableButton = getByText(/der/); // Replace with another syllable
//   fireEvent.click(secondSyllableButton);

//   const swapButton = getByTestId('swap');
//   fireEvent.click(swapButton);

//   // Check if moves and score have updated
//   expect(numMovesLabel.textContent).toBe('Moves: 1');
//   expect(scoreLabel.textContent).not.toBe('Score: 0');

//   // Now, reset
//   fireEvent.click(resetButton);

//   // Check if the moves and score reset to 0
//   expect(numMovesLabel.textContent).toBe('Moves: 0');
//   expect(scoreLabel.textContent).toBe('Score: 0');

//   cleanup();
// });

// // Test victory message when score reaches 16
// // test('Victory message appears when score is 16', async () => {
// //   const { getByText, queryByText, getByTestId } = render(React.createElement(Home));

// //   const scoreLabel = getByText(/Score: 0/i);

// //   // Mock actions that lead to victory (score of 16)
// //   // Mocking the internal model state or triggering necessary swaps
// //   // For the test to simulate reaching the winning condition:
// //   const victoryTriggerAction = getByText(/some-syllable/); // Replace with actual syllable text
// //   fireEvent.click(victoryTriggerAction);
  
// //   // Simulate reaching a score of 16
// //   fireEvent.click(victoryTriggerAction);
// //   fireEvent.click(victoryTriggerAction); // Repeat until score reaches 16

// //   // Check for the victory message
// //   const victoryMessage = getByText(/Yippee! You win!/);
// //   expect(victoryMessage).toBeDefined();

// //   // Reset the game and ensure the message disappears
// //   const resetButton = getByTestId('reset');
// //   fireEvent.click(resetButton);

// //   const noVictoryMessage = queryByText(/Yippee! You win!/);
// //   expect(noVictoryMessage).toBeNull();

// //   cleanup();
// // });

// // Test switching configurations
// test('Switch configurations', async () => {
//   const { getByTestId, getByText } = render(React.createElement(Home));

//   const config1Button = getByTestId('config_1');
//   const config2Button = getByTestId('config_2');
//   const config3Button = getByTestId('config_3');

//   // Load Configuration 1 and check initial state
//   fireEvent.click(config1Button);
//   const movesElementConfig1 = getByText(/Moves: 0/i);
//   expect(movesElementConfig1).toBeDefined();

//   // Switch to Configuration 2
//   fireEvent.click(config2Button);
//   const movesElementConfig2 = getByText(/Moves: 0/i);
//   expect(movesElementConfig2).toBeDefined();

//   // Switch to Configuration 3
//   fireEvent.click(config3Button);
//   const movesElementConfig3 = getByText(/Moves: 0/i);
//   expect(movesElementConfig3).toBeDefined();

//   cleanup();
// });
