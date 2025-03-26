import { basePath, directions, directionRows, frameCounts, frameWidth, frameHeight, animationSpeed } from './config/baseConfig.js';

export class Renderer {
    constructor(pathBuilder) {
        this.pathBuilder = pathBuilder;
        this.animationInterval = null;
    }

    updatePreview(characterState) {
        if (this.animationInterval) clearInterval(this.animationInterval);

        directions.forEach(direction => {
            document.getElementById(`dir-${direction}`).innerHTML = '';
        });

        const weaponInfo = this.pathBuilder.getWeaponPath(characterState.gender, characterState.weapon, characterState.animation);
        const layers = this.getLayers(characterState, weaponInfo);

        const weaponFrameWidth = weaponInfo ? weaponInfo.sizeInfo.width / weaponInfo.sizeInfo.cols : frameWidth;
        const weaponFrameHeight = weaponInfo ? weaponInfo.sizeInfo.height / 4 : frameHeight;

        directions.forEach(direction => {
            const dirContainer = document.getElementById(`dir-${direction}`);
            layers.forEach(layer => {
                if (layer.condition && layer.src) {
                    const img = document.createElement('img');
                    img.src = layer.src;
                    img.className = layer.class;
                    img.style.objectFit = 'none';
                    img.style.imageRendering = 'pixelated';
                    if (layer.class === 'weapon' && weaponInfo) {
                        img.style.width = `${weaponFrameWidth}px`;
                        img.style.height = `${weaponFrameHeight}px`;
                        img.style.left = `${(frameWidth - weaponFrameWidth) / 2}px`;
                        img.style.top = `${(frameHeight - weaponFrameHeight) / 2}px`;
                    } else {
                        img.style.width = `${frameWidth}px`;
                        img.style.height = `${frameHeight}px`;
                    }
                    img.onerror = () => console.error(`Ошибка загрузки изображения: ${layer.src}`);
                    dirContainer.appendChild(img);
                }
            });
        });

        this.startAnimation(characterState.animation, weaponInfo);
    }

    getLayers(state, weaponInfo) {
        return [
            { src: `${basePath}Body/Base/${state.gender}/${state.skin}/${state.animation}.png`, class: 'body', condition: true },
            { src: `${basePath}Body/Eyes/${state.gender}/${state.eyes}/${state.animation}.png`, class: 'eyes', condition: true },
            { src: this.pathBuilder.getLegsPath(state.gender, state.legs, state.animation), class: 'legs', condition: state.legs !== 'None' },
            { src: this.pathBuilder.getFeetPath(state.gender, state.feet, state.animation), class: 'feet', condition: state.feet !== 'None' },
            { src: this.pathBuilder.getTorsoPath(state.gender, state.torso, state.animation), class: 'torso', condition: state.torso !== 'None' },
            { src: this.pathBuilder.getArmsPath(state.gender, state.arms, state.animation), class: 'arms', condition: state.arms !== 'None' },
            { src: this.pathBuilder.getHandsPath(state.gender, state.hands, state.animation), class: 'hands', condition: state.hands !== 'None' },
            { src: this.pathBuilder.getShouldersPath(state.gender, state.shoulders, state.animation), class: 'shoulders', condition: state.shoulders !== 'None' },
            { src: this.pathBuilder.getWaistPath(state.gender, state.waist, state.animation), class: 'waist', condition: state.waist !== 'None' },
            { src: this.pathBuilder.getNeckPath(state.gender, state.neck, state.animation), class: 'neck', condition: state.neck !== 'None' },
            { src: `${basePath}Body/Hair/${state.gender}/${state.hairStyle}/${state.hairColor}${state.hairStyle === 'Extra Long' ? '/Front' : ''}/${state.animation}.png`, class: 'hair', condition: true },
            { src: this.pathBuilder.getHeadPath(state.gender, state.head, state.animation), class: 'head', condition: state.head !== 'None' },
            { src: this.pathBuilder.getFacePath(state.gender, state.face, state.animation), class: 'face', condition: state.face !== 'None' },
            { src: this.pathBuilder.getPropsPath(state.gender, state.props, state.animation), class: 'props', condition: state.props !== 'None' },
            { src: weaponInfo?.path, class: 'weapon', condition: state.weapon !== 'None' && weaponInfo }
        ];
    }

    startAnimation(animation, weaponInfo) {
        let currentFrame = 0;
        const totalFrames = weaponInfo ? Math.min(weaponInfo.sizeInfo.cols, frameCounts[animation] || 1) : frameCounts[animation] || 1;
        const weaponFrameWidth = weaponInfo ? weaponInfo.sizeInfo.width / weaponInfo.sizeInfo.cols : frameWidth;
        const weaponFrameHeight = weaponInfo ? weaponInfo.sizeInfo.height / 4 : frameHeight;

        this.animationInterval = setInterval(() => {
            directions.forEach(direction => {
                const dirContainer = document.getElementById(`dir-${direction}`);
                const imgs = dirContainer.querySelectorAll('img');
                const yOffset = -(directionRows[direction] * frameHeight);
                const weaponYOffset = -(directionRows[direction] * weaponFrameHeight);

                if (animation === 'idle') {
                    imgs.forEach(img => {
                        if (img.className === 'body') {
                            const xOffset = -(currentFrame % 2) * frameWidth;
                            img.style.objectPosition = `${xOffset}px ${yOffset}px`;
                            img.style.transform = 'none';
                        } else if (img.className === 'weapon') {
                            img.style.objectPosition = `0px ${weaponYOffset}px`;
                            const shift = (currentFrame % 2 !== 0) ? -0.3 : 0.1;
                            img.style.transform = `translateY(${shift}px)`;
                            img.style.transformOrigin = 'center center';
                        } else {
                            img.style.objectPosition = `0px ${yOffset}px`;
                            const shift = (currentFrame % 2 !== 0) ? -0.3 : 0.1;
                            img.style.transform = `translateY(${shift}px)`;
                            img.style.transformOrigin = 'center center';
                        }
                    });
                } else {
                    const xOffset = -(currentFrame * frameWidth);
                    const weaponXOffset = -(currentFrame * weaponFrameWidth);
                    imgs.forEach(img => {
                        if (img.className === 'weapon') {
                            img.style.objectPosition = `${weaponXOffset}px ${weaponYOffset}px`;
                        } else {
                            img.style.objectPosition = `${xOffset}px ${yOffset}px`;
                        }
                        img.style.transform = 'none';
                    });
                }
            });
            currentFrame = (currentFrame + 1) % totalFrames;
        }, animationSpeed);
    }
}