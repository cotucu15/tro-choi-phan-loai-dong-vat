import { Animal, DietType, DropZoneData } from './types';

export const ANIMALS: Animal[] = [
  {
    id: 'rabbit',
    name: 'Thỏ',
    correctZone: DietType.HERBIVORE,
    imageUrl: 'https://images.unsplash.com/photo-1591271300850-22d6784e0a7f?w=400&h=300&fit=crop'
  },
  {
    id: 'goat',
    name: 'Dê',
    correctZone: DietType.HERBIVORE,
    // TODO: Hãy thay thế đường dẫn bên dưới bằng URL hoặc mã Base64 hình ảnh con dê của bạn
    imageUrl: 'https://placehold.co/400x300/e2e8f0/1e293b?text=Anh+Cua+Ban'
  },
  {
    id: 'chicken',
    name: 'Gà',
    correctZone: DietType.OMNIVORE,
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop'
  },
  {
    id: 'snake',
    name: 'Rắn',
    correctZone: DietType.CARNIVORE,
    imageUrl: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&h=300&fit=crop'
  },
  {
    id: 'shark',
    name: 'Cá mập',
    correctZone: DietType.CARNIVORE,
    imageUrl: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=400&h=300&fit=crop'
  }
];

export const DROP_ZONES: DropZoneData[] = [
  {
    id: DietType.HERBIVORE,
    label: 'Động vật ăn cỏ',
    color: 'text-green-600 border-green-400',
    bgHelper: 'bg-green-50',
    icon: '🌿'
  },
  {
    id: DietType.CARNIVORE,
    label: 'Động vật ăn thịt',
    color: 'text-red-600 border-red-400',
    bgHelper: 'bg-red-50',
    icon: '🍖'
  },
  {
    id: DietType.OMNIVORE,
    label: 'Động vật ăn tạp',
    color: 'text-orange-600 border-orange-400',
    bgHelper: 'bg-orange-50',
    icon: '🌾🥩'
  }
];