import React, { useState } from 'react';
import { ANIMALS, DROP_ZONES } from '../constants';
import { DietType } from '../types';
import { DraggableAnimal } from './DraggableAnimal';
import { DropZone } from './DropZone';
import { CheckCircle2 } from 'lucide-react';

interface GameScreenProps {
  playerName: string;
  onFinish: (score: number) => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ playerName, onFinish }) => {
  const [placements, setPlacements] = useState<Record<string, DietType | null>>({});

  const handleDrop = (animalId: string, zoneId: DietType) => {
    setPlacements((prev) => ({
      ...prev,
      [animalId]: zoneId,
    }));
  };

  const handleFinish = () => {
    let score = 0;
    ANIMALS.forEach((animal) => {
      if (placements[animal.id] === animal.correctZone) {
        score += 1;
      }
    });
    onFinish(score);
  };

  // Get list of animals currently not placed in any zone
  const unplacedAnimals = ANIMALS.filter((a) => !placements[a.id]);
  const isAllPlaced = Object.keys(placements).length === ANIMALS.length;

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Người chơi</span>
            <span className="text-xl font-bold text-blue-600">{playerName}</span>
          </div>
          <button
            onClick={handleFinish}
            disabled={!isAllPlaced}
            className={`
              flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all shadow-md
              ${isAllPlaced 
                ? 'bg-green-500 hover:bg-green-600 text-white transform hover:scale-105' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
          >
            <CheckCircle2 size={20} />
            Hoàn thành
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
        
        {/* Drop Zones Area */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DROP_ZONES.map((zone) => (
            <div key={zone.id} className="h-full">
              <DropZone
                zone={zone}
                onDrop={handleDrop}
                placedAnimals={ANIMALS.filter((a) => placements[a.id] === zone.id)}
              />
            </div>
          ))}
        </section>

        {/* Draggable Items Area */}
        <section className={`
          bg-white/80 backdrop-blur-sm rounded-3xl p-6 border-2 border-blue-100 shadow-xl transition-all duration-500
          ${unplacedAnimals.length === 0 ? 'opacity-50 grayscale' : 'opacity-100'}
        `}>
          <h3 className="text-center text-gray-500 font-bold mb-4 uppercase text-sm tracking-widest">
            {unplacedAnimals.length > 0 ? 'Kéo các con vật vào đúng nhóm' : 'Đã phân loại xong!'}
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4 min-h-[140px]">
            {unplacedAnimals.map((animal) => (
               <div key={animal.id} className="animate-float" style={{ animationDelay: `${Math.random() * 2}s` }}>
                 <DraggableAnimal animal={animal} />
               </div>
            ))}
            {unplacedAnimals.length === 0 && (
                <div className="flex items-center justify-center text-green-500 font-bold text-lg">
                    Tuyệt vời! Hãy nhấn "Hoàn thành" để xem kết quả.
                </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
};