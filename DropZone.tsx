import React from 'react';
import { DropZoneData, Animal, DietType } from '../types';
import { DraggableAnimal } from './DraggableAnimal';

interface DropZoneProps {
  zone: DropZoneData;
  placedAnimals: Animal[];
  onDrop: (animalId: string, zoneId: DietType) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ zone, placedAnimals, onDrop }) => {
  const [isOver, setIsOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    const animalId = e.dataTransfer.getData('text/plain');
    if (animalId) {
      onDrop(animalId, zone.id);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        flex flex-col h-full min-h-[300px] rounded-2xl border-4 transition-all duration-300
        ${zone.bgHelper}
        ${isOver ? 'scale-105 shadow-2xl bg-white border-blue-500' : `${zone.color} border-dashed opacity-90`}
      `}
    >
      {/* Header */}
      <div className={`p-4 text-center border-b-2 ${isOver ? 'border-blue-200' : 'border-black/5'}`}>
        <div className="text-4xl mb-2">{zone.icon}</div>
        <h3 className="text-xl font-bold uppercase">{zone.label}</h3>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 grid grid-cols-2 gap-2 content-start">
        {placedAnimals.map((animal) => (
          <div key={animal.id} className="animate-in fade-in zoom-in duration-300">
             <DraggableAnimal animal={animal} isPlaced={true} />
          </div>
        ))}
        
        {placedAnimals.length === 0 && !isOver && (
          <div className="col-span-2 flex items-center justify-center h-full text-black/20 text-sm font-semibold italic text-center p-4">
            Kéo con vật vào đây
          </div>
        )}
      </div>
    </div>
  );
};