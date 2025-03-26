import { CharacterModel } from './characterModel.js';
import { PathBuilder } from './pathBuilder.js';
import { Renderer } from './renderer.js';
import { DomController } from './domController.js';

// Инициализация приложения
const characterModel = new CharacterModel();
const pathBuilder = new PathBuilder();
const renderer = new Renderer(pathBuilder);
const domController = new DomController(characterModel, renderer);

domController.initialize();