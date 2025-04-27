import React, { useState, useEffect } from 'react';
import './App.css';
import questions from './question.json';

function App() {
  const [playerName, setPlayerName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameQuestions, setGameQuestions] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState("");
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    setGameQuestions(shuffledQuestions.slice(0, 4));
  }, []);

  const currentRiddle = gameQuestions[currentIndex];

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
      setShowHint(false);
    } else {
      setResult("Incorrect. Try again!");
    }
  };


  const nextQuestion = () => {
    if (currentIndex === 3) { // 4 questions, so index 3 is last
      setGameFinished(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setUserAnswer("");
    setResult("");
    setAnswered(false);
    setShowHint(false);
  };

  const tryAgain = () => {
    setUserAnswer("");
    setResult("");
    setAnswered(false);
    setShowHint(true); // Show hint after first retry
  };

  const restartGame = () => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    setGameQuestions(shuffledQuestions.slice(0, 4));
    setGameStarted(false);
    setPlayerName("");
    setNameInput("");
    setCurrentIndex(0);
    setUserAnswer("");
    setResult("");
    setAnswered(false);
    setScore(0);
    setGameFinished(false);
    setShowHint(false);
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
          <p>Your score: {score} out of 4</p>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <p style={{ margin: 0 }}>{currentRiddle.question}</p>
        </div>
        {/* Hint button and hint only if answer is wrong */}
        {/* Show Hint button always, and show hint below when clicked */}
        <div style={{ margin: '10px 0' }}>
          {!showHint && (
            <button
              type="button"
              style={{
                background: '#eee',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 16px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '15px',
                marginLeft: '8px'
              }}
              onClick={() => setShowHint(true)}
            >
              Show Hint
            </button>
          )}
          {showHint && (
            <div style={{
              marginTop: '8px',
              background: '#333',
              color: '#fff',
              padding: '8px 14px',
              borderRadius: '6px',
              display: 'inline-block',
              fontSize: '15px',
              maxWidth: '300px',
              whiteSpace: 'pre-line'
            }}>
              {currentRiddle.hint}
            </div>
          )}
        </div>
        <form onSubmit={checkAnswer} style={{ margin: '20px 0' }}>
          <input
            type="text"
            value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
            placeholder="Your answer..."
            style={{ padding: '8px', fontSize: '16px' }}
            disabled={answered && result && result.startsWith('Correct')}
          />
          <button type="submit" style={{ marginLeft: '10px', padding: '8px 16px', fontSize: '16px' }} disabled={answered && result && result.startsWith('Correct')}>Submit</button>
        </form>
        {result && <div style={{ fontWeight: 'bold', marginTop: '10px' }}>{result}</div>}
        {(answered || showHint) && (
          <div style={{ marginTop: '16px' }}>
            <button onClick={tryAgain} style={{ padding: '8px 16px', fontSize: '16px', marginRight: '10px' }}>Try Again</button>
            {answered && (
              <button onClick={nextQuestion} style={{ padding: '8px 16px', fontSize: '16px' }}>
                {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
