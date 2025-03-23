export class AnimationController {
    constructor(spriteRenderer) {
        this.spriteRenderer = spriteRenderer;
        this.currentAnimation = 'idle';
        this.frame = 0;
        this.direction = 0;
        this.isPlaying = false;
        this.speed = 10;
        this.animations = {
            idle: { frames: 1, directions: 4, loop: true },
            walk: { frames: 8, directions: 4, loop: true },
            swing: { frames: 6, directions: 4, loop: false },
            thrust: { frames: 8, directions: 4, loop: false },
            shoot: { frames: 13, directions: 4, loop: false },
            cast: { frames: 7, directions: 4, loop: false },
            hurt: { frames: 6, directions: 1, loop: false }
        };
    }

    setAnimation(type) {
        if (this.animations[type]) {
            this.currentAnimation = type;
            this.frame = 0;
            this.spriteRenderer.renderSpritesheet(
                this.animations[type].frames,
                this.animations[type].directions
            );
            this.renderFrame();
        }
    }

    setDirection(direction) {
        this.direction = direction;
        this.renderFrame();
    }

    play() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.animate();
        }
    }

    stop() {
        this.isPlaying = false;
    }

    animate() {
        if (!this.isPlaying) return;

        this.renderFrame();
        const anim = this.animations[this.currentAnimation];
        this.frame++;

        if (this.frame >= anim.frames) {
            this.frame = anim.loop ? 0 : anim.frames - 1;
            if (!anim.loop) this.stop();
        }

        setTimeout(() => this.animate(), 1000 / this.speed);
    }

    renderFrame() {
        this.spriteRenderer.renderPreview(this.frame, this.direction);
    }
}
