// Базовая конфигурация
export const basePath = './assets/sprite/character/';
export const directions = ['north', 'east', 'south', 'west'];
export const directionRows = { north: 0, east: 2, south: 1, west: 3 };
export const frameCounts = { idle: 2, walk: 8, hurt: 6, magic: 7, shoot: 13, swing: 6, thrust: 8 };
export const frameWidth = 64;
export const frameHeight = 64;
export const animationSpeed = 300;

export const animations = {
    'Human_female': ['idle', 'hurt', 'magic', 'shoot', 'swing', 'thrust', 'walk'],
    'Human_male': ['idle', 'hurt', 'magic', 'shoot', 'swing', 'thrust', 'walk']
};