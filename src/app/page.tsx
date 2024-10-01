"use client"; // Mark this page as a client-side rendered page

import React from 'react';
import { Model } from '../model'
import { configuration_1, configuration_2, configuration_3 } from '../puzzle'

export default function Home() {

  // initial instantiation of the Model comes from the actualPuzzle
  const [model, setModel] = React.useState(new Model(configuration_1));
  const [redraw, setRedraw] = React.useState(0)
  const [showVictoryMessage, setShowVictoryMessage] = React.useState(false); // New state for victory message

  const canvasRef = React.useRef(null)   // Later need to be able to refer to App

  // Force redraw by updating state
  const forceRedraw = () => setRedraw(redraw + 1);

  const gridRows = model.puzzle.numColumns; // Define the grid rows
  const gridColumns = model.puzzle.numRows; // Define the grid columns

  const checkVictory = () => {
    if (model.score === 16) {
      model.victory = true;
      forceRedraw();
    }
  };

  // Function to handle button click, displaying the button's coordinates
  const selectSyllableClick = (row: number, col: number) => {
    model.puzzle.selectSyllable(row, col);
    forceRedraw();
  };

  const swapSyllables = () => {
    if (model.puzzle.swapSyllables()) {
      model.calculateScore();
      model.numMoves++;
      checkVictory();
      forceRedraw();
    }
  }

  const undo = () => {
    if (model.puzzle.undo()) {
      model.calculateScore();
      model.numMoves--;
      forceRedraw();
    }
  }

  const reset = () => {
    model.puzzle.reset();
    model.calculateScore();
    model.numMoves = 0;
    model.victory = false;
    forceRedraw();
  }

  const loadConfig_1 = () => {
    const newModel = new Model(configuration_1);
    setModel(newModel);  // Update the model state
    setShowVictoryMessage(false); // Hide victory message on reset
    forceRedraw();
  }

  const loadConfig_2 = () => {
    const newModel = new Model(configuration_2);
    setModel(newModel);  // Update the model state
    setShowVictoryMessage(false); // Hide victory message on reset
    forceRedraw();
  }

  const loadConfig_3 = () => {
    const newModel = new Model(configuration_3);
    setModel(newModel);  // Update the model state
    setShowVictoryMessage(false); // Hide victory message on reset
    forceRedraw();
  }

  return (
    <main style={{ backgroundColor: '#a7e3e8' }} className="flex min-h-screen flex-col">

      {model.victory && (
        <div className="victory-message">
          Yippee! You win!
        </div>
      )}
      <div className="grid-container">
        {Array.from({ length: gridRows }).map((_: any, row: any) => (
          Array.from({ length: gridColumns }).map((_, col) => {
            const syllable = model.puzzle.getSyllable(row, col);
            const isSelected = syllable?.isSelected || false;
            const isCorrect = syllable?.isCorrect || false;
            return (
              <button
                key={`${row}-${col}`}
                onClick={() => selectSyllableClick(row, col)}
                disabled={model.victory}
                className={`${isSelected ? "selected" : ""} ${isCorrect ? "correct" : ""}`}
              >

                {syllable?.word}

              </button>
            );
          })
        ))}
      </div>

      <div className="buttons">
        <button
          data-testid="swap"
          className="button swapbutton"
          onClick={() => swapSyllables()}
          disabled={model.puzzle.selectedSyllables.length !== 2} // Disable if not exactly 2 selected syllables
        >
          Swap
        </button>
        <button 
          data-testid="undo" 
          className="button undobutton" 
          onClick={() => undo()}
          disabled={model.puzzle.swappedSyllables.length == 0 || model.victory}
        >
          Undo
        </button>
        <button 
          data-testid="reset" 
          className="button resetbutton" 
          onClick={() => reset()}
          disabled={model.puzzle.swappedSyllables.length == 0}
          >
          Reset
        </button>
      </div>

      <div className="labels">
        <label data-testid="nummoves" className="nummoves">{"Moves: " + model.numMoves}</label>
        <label data-testid="score" className="score">{"Score: " + model.score}</label>
      </div>

      <div className='configs'>
        <button data-testid="config_1" className="button config_1" onClick={() => loadConfig_1()}>Configuration 1</button>
        <button data-testid="config_2" className="button config_2" onClick={() => loadConfig_2()}>Configuration 2</button>
        <button data-testid="config_3" className="button config_3" onClick={() => loadConfig_3()}>Configuration 3</button>
      </div>

    </main>
  );
};
