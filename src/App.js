import React, { useState } from 'react';
import './App.css';
import questions from './question.json';

function App() {
  const [playerName, setPlayerName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState("");
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const currentRiddle = questions[currentIndex];

  const startGame = (e) => {
    e.preventDefault();
    if (nameInput.trim() !== "") {
      setPlayerName(nameInput.trim());
      setGameStarted(true);
    }
  };

  const checkAnswer = (e) => {
    e.preventDefault();
    setAnswered(true);
    if (userAnswer.trim().toLowerCase() === currentRiddle.answer) {
      setResult("Correct! 🎉");
      setScore((prev) => prev + 1);
    } else {
      setResult("Incorrect. Try again!");
    }
  };

  const nextQuestion = () => {
    if (currentIndex === questions.length - 1) {
      setGameFinished(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setUserAnswer("");
    setResult("");
    setAnswered(false);
  };

  const restartGame = () => {
    setGameStarted(false);
    setPlayerName("");
    setNameInput("");
    setCurrentIndex(0);
    setUserAnswer("");
    setResult("");
    setAnswered(false);
    setScore(0);
    setGameFinished(false);
  };

  if (!gameStarted) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Riddle Trivia Game</h1>
          <form onSubmit={startGame} style={{ margin: '20px 0' }}>
            <input
              type="text"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              placeholder="Enter your name..."
              style={{ padding: '8px', fontSize: '16px' }}
            />
            <button type="submit" style={{ marginLeft: '10px', padding: '8px 16px', fontSize: '16px' }}>Start Game</button>
          </form>
        </header>
      </div>
    );
  }

  if (gameFinished) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Game Over!</h1>
          <p>Well done, {playerName}!</p>
          <p>Your score: {score} out of {questions.length}</p>
          <button onClick={restartGame} style={{ padding: '8px 16px', fontSize: '16px', marginTop: '16px' }}>Play Again</button>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Riddle Trivia Game</h1>
        <p>Player: {playerName}</p>
        <p>Question {currentIndex + 1} of {questions.length}</p>
        <p>{currentRiddle.question}</p>
        <form onSubmit={checkAnswer} style={{ margin: '20px 0' }}>
          <input
            type="text"
            value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
            placeholder="Your answer..."
            style={{ padding: '8px', fontSize: '16px' }}
            disabled={answered}
          />
          <button type="submit" style={{ marginLeft: '10px', padding: '8px 16px', fontSize: '16px' }} disabled={answered}>Submit</button>
        </form>
        {result && <div style={{ fontWeight: 'bold', marginTop: '10px' }}>{result}</div>}
        {answered && (
          <button onClick={nextQuestion} style={{ marginTop: '16px', padding: '8px 16px', fontSize: '16px' }}>
            {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
