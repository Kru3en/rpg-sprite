import { animations } from './config/baseConfig.js';
import { hairColors, hairStyles, eyeColors } from './config/hairConfig.js';
import { torsoOptions, torsoColors } from './config/torsoConfig.js';
import { headOptions, headColors } from './config/headConfig.js';
import { faceOptions, faceColors } from './config/faceConfig.js';
import { neckOptions, neckColors } from './config/neckConfig.js';
import { armsOptions, armsColors } from './config/armsConfig.js';
import { handsOptions, handsColors } from './config/handsConfig.js';
import { shouldersOptions, shouldersColors } from './config/shouldersConfig.js';
import { waistOptions, waistColors } from './config/waistConfig.js';
import { legsOptions, legsColors } from './config/legsConfig.js';
import { feetOptions, feetColors } from './config/feetConfig.js';
import { propsOptions, propsColors } from './config/propsConfig.js';
import { weaponOptions } from './config/weaponConfig.js';

export class DomController {
    constructor(characterModel, renderer) {
        this.characterModel = characterModel;
        this.renderer = renderer;
    }

    initialize() {
        this.populateSelect('hairColor', hairColors);
        this.populateSelect('eyes', eyeColors);
        this.updateAnimations();
        this.addEventListeners();
    }

    populateSelect(id, options) {
        const select = document.getElementById(id);
        if (!select) throw new Error(`Элемент с ID ${id} не найден`);
        select.innerHTML = '';
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.text = option;
            select.appendChild(opt);
        });
    }

    updateAnimations() {
        const gender = document.getElementById('gender').value;
        this.characterModel.updateState('gender', gender);

        this.populateSelect('animation', animations[gender]);
        this.populateSelect('hairStyle', hairStyles[gender]);
        this.populateSelect('torso', torsoOptions[gender]);
        this.populateSelect('head', headOptions[gender]);
        this.populateSelect('face', faceOptions[gender]);
        this.populateSelect('neck', neckOptions[gender]);
        this.populateSelect('arms', armsOptions[gender]);
        this.populateSelect('hands', handsOptions[gender]);
        this.populateSelect('shoulders', shouldersOptions[gender]);
        this.populateSelect('waist', waistOptions[gender]);
        this.populateSelect('legs', legsOptions[gender]);
        this.populateSelect('feet', feetOptions[gender]);
        this.populateSelect('props', propsOptions[gender]);
        this.updateWeaponOptions();

        this.updateColorControls('torso', torsoColors, 'currentTorsoColor');
        this.updateColorControls('head', headColors, 'currentHeadColor');
        this.updateColorControls('face', faceColors, 'currentFaceColor');
        this.updateColorControls('neck', neckColors, 'currentNeckColor');
        this.updateColorControls('arms', armsColors, 'currentArmsColor');
        this.updateColorControls('hands', handsColors, 'currentHandsColor');
        this.updateColorControls('shoulders', shouldersColors, 'currentShouldersColor');
        this.updateColorControls('waist', waistColors, 'currentWaistColor');
        this.updateColorControls('legs', legsColors, 'currentLegsColor');
        this.updateColorControls('feet', feetColors, 'currentFeetColor');
        this.updateColorControls('props', propsColors, 'currentPropsColor');

        this.renderer.updatePreview(this.characterModel.getState());
    }

    updateWeaponOptions() {
        const gender = document.getElementById('gender').value;
        const animation = document.getElementById('animation').value;
        const weaponSelect = document.getElementById('weapon');
        weaponSelect.innerHTML = '';

        const allWeapons = [...new Set([
            ...weaponOptions[gender]['Shoot'],
            ...weaponOptions[gender]['Swing'],
            ...weaponOptions[gender]['Thrust']
        ])];

        allWeapons.forEach(weapon => {
            const option = document.createElement('option');
            option.value = weapon;
            option.text = weapon;
            weaponSelect.appendChild(option);
        });

        this.characterModel.updateState('weapon', weaponSelect.value);
        this.renderer.updatePreview(this.characterModel.getState());
    }

    updateColorControls(part, options, currentColorVar) {
        const gender = document.getElementById('gender').value;
        const partValue = document.getElementById(part).value;
        const container = document.getElementById(`${part}-color-controls`);
        container.innerHTML = '';

        const colors = options[gender][partValue] || [];
        if (colors.length === 0) {
            container.innerHTML = '<p>Нет доступных цветов</p>';
            window[currentColorVar] = null;
            return;
        }

        colors.forEach(color => {
            const btn = document.createElement('button');
            btn.className = 'torso-color-btn';
            btn.textContent = color;
            btn.onclick = () => {
                window[currentColorVar] = color;
                container.querySelectorAll('.torso-color-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderer.updatePreview(this.characterModel.getState());
            };
            if (color === window[currentColorVar]) {
                btn.classList.add('active');
            }
            container.appendChild(btn);
        });

        if (!window[currentColorVar] || !colors.includes(window[currentColorVar])) {
            window[currentColorVar] = colors[0];
            container.querySelector('.torso-color-btn').classList.add('active');
        }
    }

    addEventListeners() {
        document.querySelectorAll('select').forEach(select => {
            select.addEventListener('change', () => {
                if (select.id === 'gender') {
                    this.updateAnimations();
                } else if (select.id === 'animation') {
                    this.characterModel.updateState('animation', select.value);
                    this.updateWeaponOptions();
                } else if (select.id === 'weapon') {
                    this.characterModel.updateState('weapon', select.value);
                    this.renderer.updatePreview(this.characterModel.getState());
                } else {
                    this.characterModel.updateState(select.id, select.value);
                    if (select.id !== 'animation') {
                        this.updateColorControls(select.id, eval(`${select.id}Colors`), `current${select.id.charAt(0).toUpperCase() + select.id.slice(1)}Color`);
                    }
                    this.renderer.updatePreview(this.characterModel.getState());
                }
            });
        });
    }
}