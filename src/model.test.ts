import { describe, it, expect, test } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Home from './app/page';
import React from 'react';

test('Home component renders correctly', async () => {
  const { getByText } = render(React.createElement(Home));
  
  const movesElement = getByText(/Moves: 0/i);
  const scoreElement = getByText(/Score: 0/i);
  
  expect(movesElement).toBeDefined();
  expect(scoreElement).toBeDefined();

  cleanup();
});

describe('Home Component - Swap, Undo, and Reset', () => {
  it('should disable the swap button when fewer than two syllables are selected and enable it when two are selected', () => {
    const { getByTestId, getAllByRole } = render(React.createElement(Home));
    const swapButton = getByTestId('swap') as HTMLButtonElement;
    const syllableButtons = getAllByRole('button').filter(
      (button) => {
        const text = button.textContent;
        return text !== null && !['Swap', 'Undo', 'Reset', 'Configuration 1', 'Configuration 2', 'Configuration 3'].includes(text);
      }
    );

    // swap button tests
    expect(swapButton.disabled).toBe(true);
    fireEvent.click(syllableButtons[0]);
    expect(swapButton.disabled).toBe(true);
    fireEvent.click(syllableButtons[1]);
    expect(swapButton.disabled).toBe(false);
    fireEvent.click(swapButton);
    expect(swapButton.disabled).toBe(true);

    // undo button tests
    const undoButton = getByTestId('undo') as HTMLButtonElement;
    expect(undoButton.disabled).toBe(false);
    fireEvent.click(undoButton);
    expect(undoButton.disabled).toBe(true);

    // reset button tests
    const resetButton = getByTestId('reset') as HTMLButtonElement;
    expect(resetButton.disabled).toBe(true);
    fireEvent.click(syllableButtons[0]);
    fireEvent.click(syllableButtons[1]);
    fireEvent.click(swapButton);
    expect(resetButton.disabled).toBe(false);
    fireEvent.click(resetButton);
    expect(resetButton.disabled).toBe(true);
  });

  it('should load the correct configuration when each configuration button is clicked', () => {
    const { getAllByTestId } = render(React.createElement(Home));
    const configButtons = getAllByTestId('config_1');
    fireEvent.click(configButtons[0]);
    const configButton2 = getAllByTestId('config_2')[0];
    fireEvent.click(configButton2);
    const configButton3 = getAllByTestId('config_3')[0];
    fireEvent.click(configButton3);
  });
});
