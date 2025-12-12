import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCcw, Star } from 'lucide-react';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  playerName: string;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ score, totalQuestions, playerName, onRestart }) => {
  const isPerfect = score === totalQuestions;
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Reveal animation
    setTimeout(() => setShowContent(true), 100);

    if (isPerfect) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isPerfect]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className={`transform transition-all duration-700 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} flex flex-col items-center bg-white text-gray-800 p-8 rounded-3xl shadow-2xl max-w-lg w-full text-center relative overflow-hidden`}>
        
        {/* Background rays for perfect score */}
        {isPerfect && (
             <div className="absolute inset-0 bg-yellow-50 z-0 animate-pulse pointer-events-none"></div>
        )}

        <div className="relative z-10 flex flex-col items-center">
            {isPerfect ? (
            <div className="mb-6 animate-bounce">
                <Trophy size={80} className="text-yellow-400 drop-shadow-lg" fill="currentColor" />
            </div>
            ) : (
             <div className="mb-6">
                <Star size={80} className="text-blue-400" />
             </div>
            )}

            <h2 className="text-2xl font-bold mb-2 text-gray-500">Kết quả của</h2>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
            {playerName}
            </h1>

            <div className="text-6xl font-black text-gray-800 mb-4">
            {score}<span className="text-4xl text-gray-400">/{totalQuestions}</span>
            </div>

            {isPerfect ? (
            <div className="bg-yellow-100 border-2 border-yellow-300 text-yellow-800 px-6 py-3 rounded-xl font-bold text-xl mb-8 animate-pulse shadow-md">
                Chúc mừng! Bạn thật giỏi!
            </div>
            ) : (
            <div className="bg-blue-50 text-blue-800 px-6 py-3 rounded-xl font-medium text-lg mb-8">
                Làm tốt lắm! Hãy thử lại để đạt điểm tuyệt đối nhé.
            </div>
            )}

            <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-lg transform hover:-translate-y-1"
            >
            <RefreshCcw size={24} />
            Chơi lại
            </button>
        </div>
      </div>
    </div>
  );
};