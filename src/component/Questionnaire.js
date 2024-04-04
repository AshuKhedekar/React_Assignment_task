import React, { useState, useEffect } from 'react';
import { QUESTIONS } from '../questions.ts';

function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [yesAnswers, setYesAnswers] = useState(0);
  const [score, setScore] = useState(null);
  const [averageScore, setAverageScore] = useState(null);

  const handleAnswer = (answer) => {
    setYesAnswers(answer === 'yes' ? yesAnswers + 1 : yesAnswers);
    setCurrentQuestion(currentQuestion + 1);
  };

  useEffect(() => {
    if (currentQuestion > Object.keys(QUESTIONS).length) {
      const newScore = (yesAnswers / Object.keys(QUESTIONS).length) * 100;
      setScore(newScore);
      setYesAnswers(0);
    }
  }, [currentQuestion, yesAnswers]);

  useEffect(() => {
    const totalScore = parseFloat(localStorage.getItem('totalScore') || '0');
    const totalRuns = parseFloat(localStorage.getItem('totalRuns') || '0');
    const avgScore = totalRuns > 0 ? totalScore / totalRuns : 0;
    setAverageScore(avgScore);
  }, []);

  useEffect(() => {
    // Update localStorage with total score and total runs
    if (score !== null) {
      const totalScore = parseFloat(localStorage.getItem('totalScore') || '0') + score;
      const totalRuns = parseFloat(localStorage.getItem('totalRuns') || '0') + 1;
      localStorage.setItem('totalScore', totalScore.toString());
      localStorage.setItem('totalRuns', totalRuns.toString());
    }
  }, [score]);

  return (
    <div>
      {currentQuestion <= Object.keys(QUESTIONS).length ? (
        <div>
          <h2>{QUESTIONS[currentQuestion]}</h2>
          <button onClick={() => handleAnswer('yes')}>Yes</button>
          <button onClick={() => handleAnswer('no')}>No</button>
        </div>
      ) : (
        <div>
          <h2>Score for this run: {score}</h2>
          <h2>Average score: {averageScore}</h2>
        </div>
      )}
    </div>
  );
}

export default Questionnaire;
