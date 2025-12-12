import React from 'react';
import { Animal } from '../types';

interface DraggableAnimalProps {
  animal: Animal;
  isPlaced?: boolean;
}

export const DraggableAnimal: React.FC<DraggableAnimalProps> = ({ animal, isPlaced = false }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', animal.id);
    e.dataTransfer.effectAllowed = 'move';
    // Create a ghost image if needed, but default browser behavior is usually fine
  };

  if (isPlaced) {
    return (
      <div className="relative group cursor-grab active:cursor-grabbing w-full h-full">
         <img 
            src={animal.imageUrl} 
            alt={animal.name} 
            className="w-full h-20 object-cover rounded-lg shadow-sm"
          />
          <div className="absolute bottom-0 w-full bg-black/50 text-white text-xs text-center py-1 rounded-b-lg">
            {animal.name}
          </div>
      </div>
    )
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white p-2 rounded-xl shadow-md cursor-grab active:cursor-grabbing hover:shadow-xl hover:-translate-y-1 transition-all w-32 flex flex-col items-center border-2 border-transparent hover:border-blue-300"
    >
      <div className="w-24 h-24 overflow-hidden rounded-lg mb-2">
        <img 
          src={animal.imageUrl} 
          alt={animal.name} 
          className="w-full h-full object-cover pointer-events-none" 
        />
      </div>
      <span className="font-bold text-gray-700 text-lg">{animal.name}</span>
    </div>
  );
};