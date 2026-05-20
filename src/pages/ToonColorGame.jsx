import React, { useState, useCallback } from 'react';
import { getRandomSet } from '@/data/questions';
import { calculateScore } from '@/utils/colorMath';
import IntroScreen from './IntroScreen';
import PlayingScreen from './PlayingScreen';
import FinalScreen from './FinalScreen';

const STATES = {
  INTRO: 'INTRO',
  PLAYING: 'PLAYING',
  RESULT_FINAL: 'RESULT_FINAL',
};

export default function ToonColorGame() {
  const [gameState, setGameState] = useState(STATES.INTRO);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState([]);

  const handleStart = useCallback(() => {
    const set = getRandomSet();
    setQuestions(set);
    setCurrentIndex(0);
    setResults([]);
    setGameState(STATES.PLAYING);
  }, []);

  const handleConfirm = useCallback((playerHSB) => {
    const question = questions[currentIndex];
    const score = calculateScore(playerHSB, question.answer);
    const newResult = { playerHSB, score };
    setResults(prev => [...prev, newResult]);
  }, [questions, currentIndex]);

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= questions.length) {
      setGameState(STATES.RESULT_FINAL);
    } else {
      setCurrentIndex(nextIndex);
      setGameState(STATES.PLAYING);
    }
  }, [currentIndex, questions.length]);

  const handlePlayAgain = useCallback(() => {
    handleStart();
  }, [handleStart]);

  const handleHome = useCallback(() => {
    setGameState(STATES.INTRO);
  }, []);

  switch (gameState) {
    case STATES.INTRO:
      return <IntroScreen onStart={handleStart} />;

    case STATES.PLAYING:
      return (
        <PlayingScreen
          key={currentIndex}
          question={questions[currentIndex]}
          questionIndex={currentIndex}
          totalQuestions={questions.length}
          onConfirm={handleConfirm}
          onNext={handleNext}
        />
      );

    case STATES.RESULT_FINAL:
      return (
        <FinalScreen
          results={results}
          questions={questions}
          onPlayAgain={handlePlayAgain}
          onHome={handleHome}
        />
      );

    default:
      return null;
  }
}