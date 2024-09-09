import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const initialState = {
  'Cabbage': 'west',
  'Goat': 'west',
  'Wolf': 'west',
  'Farmer': 'west'
};

const goalState = {
  'Cabbage': 'east',
  'Goat': 'east',
  'Wolf': 'east',
  'Farmer': 'east'
};

const areStatesEqual = (state1, state2) => {
  return JSON.stringify(state1) === JSON.stringify(state2);
};

const isValid = (state) => {
  if (state['Goat'] === state['Cabbage'] && state['Farmer'] !== state['Goat']) return false;
  if (state['Wolf'] === state['Cabbage'] && state['Farmer'] !== state['Wolf']) return false;
  return true;
};

const getNextStates = (state) => {
  const nextStates = [];
  const farmerSide = state['Farmer'];
  const oppositeSide = farmerSide === 'west' ? 'east' : 'west';

  const newState = { ...state, 'Farmer': oppositeSide };
  if (isValid(newState)) nextStates.push(newState);

  ['Cabbage', 'Goat', 'Wolf'].forEach(item => {
    if (state[item] === farmerSide) {
      const itemState = { ...state, 'Farmer': oppositeSide, [item]: oppositeSide };
      if (isValid(itemState)) nextStates.push(itemState);
    }
  });

  return nextStates;
};

const backtrack = (state, path, visited) => {
  if (areStatesEqual(state, goalState)) {
    return path;
  }

  const stateKey = JSON.stringify(state);
  if (visited.has(stateKey)) return null;

  visited.add(stateKey);

  for (const nextState of getNextStates(state)) {
    const result = backtrack(nextState, [...path, nextState], visited);
    if (result) return result;
  }

  visited.delete(stateKey);
  return null;
};

const solvePuzzle = () => {
  const visited = new Set();
  return backtrack(initialState, [initialState], visited);
};

const RiverCrossingPuzzle = () => {
  const [state, setState] = useState(initialState);
  const [solution, setSolution] = useState([]);
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState('');
  const [isSolving, setIsSolving] = useState(false);

  useEffect(() => {
    if (isSolving) {
      const solutionSteps = solvePuzzle();
      setSolution(solutionSteps);
      setIsSolving(false);
    }
  }, [isSolving]);

  const move = (item) => {
    if (item !== 'Farmer' && state[item] !== state['Farmer']) {
      setMessage("The farmer must be with the item to move it!");
      return;
    }

    const newState = {
      ...state,
      [item]: state[item] === 'west' ? 'east' : 'west',
      'Farmer': state['Farmer'] === 'west' ? 'east' : 'west'
    };

    if (!isValid(newState)) {
      setMessage("Invalid move! The goat would eat the cabbage or the wolf would eat the cabbage.");
      return;
    }

    setState(newState);
    setMessage('');

    if (areStatesEqual(newState, goalState)) {
      setMessage("Congratulations! You've solved the puzzle!");
    }
  };

  const nextStep = () => {
    if (step < solution.length - 1) {
      setStep(step + 1);
      setState(solution[step + 1]);
      setMessage('');
    }
  };

  const resetPuzzle = () => {
    setState(initialState);
    setStep(0);
    setMessage('');
  };

  const solvePuzzleHandler = () => {
    setIsSolving(true);
    setStep(0);
    setState(initialState);
    setMessage('Solving the puzzle...');
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">River Crossing Puzzle 🚣‍♂️🐺🐐🥬</h1>
      <div className="flex justify-between mb-4">
        <div className="w-1/3 bg-green-100 p-2 rounded">
          <h2 className="font-bold">West Bank</h2>
          {Object.entries(state).map(([item, bank]) => (
            bank === 'west' && <div key={item} className="capitalize">{item} {item === 'Wolf' ? '🐺' : item === 'Goat' ? '🐐' : item === 'Cabbage' ? '🥬' : '🚣‍♂️'}</div>
          ))}
        </div>
        <div className="w-1/4 bg-blue-100 p-2 rounded">
          <h2 className="font-bold">River</h2>
        </div>
        <div className="w-1/3 bg-green-100 p-2 rounded">
          <h2 className="font-bold">East Bank</h2>
          {Object.entries(state).map(([item, bank]) => (
            bank === 'east' && <div key={item} className="capitalize">{item} {item === 'Wolf' ? '🐺' : item === 'Goat' ? '🐐' : item === 'Cabbage' ? '🥬' : '🚣‍♂️'}</div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="font-bold mb-2">Move:</h2>
        {['Farmer', 'Wolf', 'Goat', 'Cabbage'].map(item => (
          <button
            key={item}
            onClick={() => move(item)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2"
          >
            {item} {item === 'Wolf' ? '🐺' : item === 'Goat' ? '🐐' : item === 'Cabbage' ? '🥬' : '🚣‍♂️'}
          </button>
        ))}
      </div>
      <button
        onClick={nextStep}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
        disabled={solution.length === 0}
      >
        Next Step
      </button>
      <button
        onClick={resetPuzzle}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Reset
      </button>
      <button
        onClick={solvePuzzleHandler}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
      >
        Solve Puzzle
      </button>
      {message && (
        <div className="mt-4 p-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          {message}
        </div>
      )}
      <div className="mt-4">
        <h2 className="font-bold">Current Step: {step + 1} / {solution.length || 1}</h2>
        <p>{Object.entries(state).map(([item, bank]) => `${item}: ${bank}`).join(', ')}</p>
      </div>
    </div>
  );
};

export default RiverCrossingPuzzle;
