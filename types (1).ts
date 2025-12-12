export enum DietType {
  HERBIVORE = 'HERBIVORE',
  CARNIVORE = 'CARNIVORE',
  OMNIVORE = 'OMNIVORE',
}

export interface Animal {
  id: string;
  name: string;
  correctZone: DietType;
  imageUrl: string;
}

export interface DropZoneData {
  id: DietType;
  label: string;
  color: string;
  bgHelper: string;
  icon: string;
}

export type GamePhase = 'WELCOME' | 'PLAYING' | 'RESULT';

export interface GameState {
  phase: GamePhase;
  playerName: string;
  score: number;
  placements: Record<string, DietType | null>; // animalId -> zoneId
}