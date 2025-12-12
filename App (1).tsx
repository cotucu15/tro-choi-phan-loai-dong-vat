import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { GameScreen } from './components/GameScreen';
import { ResultScreen } from './components/ResultScreen';
import { GameState, GamePhase } from './types';
import { ANIMALS } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'WELCOME',
    playerName: '',
    score: 0,
    placements: {},
  });

  const handleStart = (name: string) => {
    setGameState((prev) => ({
      ...prev,
      phase: 'PLAYING',
      playerName: name,
    }));
  };

  const handleFinishGame = (score: number) => {
    setGameState((prev) => ({
      ...prev,
      phase: 'RESULT',
      score,
    }));
  };

  const handleRestart = () => {
    setGameState({
      phase: 'WELCOME',
      playerName: '',
      score: 0,
      placements: {},
    });
  };

  return (
    <div className="font-sans text-gray-900">
      {gameState.phase === 'WELCOME' && (
        <WelcomeScreen onStart={handleStart} />
      )}
      
      {gameState.phase === 'PLAYING' && (
        <GameScreen 
          playerName={gameState.playerName} 
          onFinish={handleFinishGame} 
        />
      )}

      {gameState.phase === 'RESULT' && (
        <ResultScreen
          score={gameState.score}
          totalQuestions={ANIMALS.length}
          playerName={gameState.playerName}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default App;