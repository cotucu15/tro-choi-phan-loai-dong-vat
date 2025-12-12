import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: (name: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-sky-200 to-blue-300">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center transform hover:scale-105 transition-transform duration-300">
        <div className="mb-6 text-6xl animate-bounce">🦁</div>
        <h1 className="text-3xl font-extrabold text-blue-600 mb-2">Phân Loại Động Vật</h1>
        <p className="text-gray-500 mb-8">Chào mừng các bé đến với trò chơi khám phá thế giới tự nhiên!</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-1 mb-1">Tên của bé là gì?</label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-blue-400 focus:ring focus:ring-blue-200 outline-none transition-all text-lg"
              placeholder="Nhập tên bé vào đây..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xl"
          >
            <Play size={24} fill="currentColor" />
            Bắt đầu chơi
          </button>
        </form>
      </div>
    </div>
  );
};