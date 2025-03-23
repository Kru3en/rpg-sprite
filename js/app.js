import { CharacterModel } from './character-model.js';
import { AssetLoader } from './asset-loader.js';
import { SpriteRenderer } from './sprite-renderer.js';
import { AnimationController } from './animation-controller.js';
import { UIController } from './ui-controller.js';

class App {
    constructor() {
        this.model = new CharacterModel();
        this.assetLoader = new AssetLoader();
        this.renderer = new SpriteRenderer(
            document.getElementById('preview-canvas'),
            document.getElementById('spritesheet-canvas')
        );
        this.animation = new AnimationController(this.renderer);
        this.ui = new UIController(this.model, this.assetLoader, this.renderer, this.animation);
    }

    async init() {
        await this.ui.init();
        this.animation.setAnimation('idle');
        this.animation.play();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
