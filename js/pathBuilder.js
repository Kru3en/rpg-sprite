import { basePath } from './config/baseConfig.js';
import { torsoColors } from './config/torsoConfig.js';
import { headColors } from './config/headConfig.js';
import { faceColors } from './config/faceConfig.js';
import { neckColors } from './config/neckConfig.js';
import { armsColors } from './config/armsConfig.js';
import { handsColors } from './config/handsConfig.js';
import { shouldersColors } from './config/shouldersConfig.js';
import { waistColors } from './config/waistConfig.js';
import { legsColors } from './config/legsConfig.js';
import { feetColors } from './config/feetConfig.js';
import { propsColors } from './config/propsConfig.js';
import { weaponSpriteSizes, weaponOptions } from './config/weaponConfig.js';

// Глобальные переменные для цветов, как в оригинале
window.currentTorsoColor = null;
window.currentHeadColor = null;
window.currentFaceColor = null;
window.currentNeckColor = null;
window.currentArmsColor = null;
window.currentHandsColor = null;
window.currentShouldersColor = null;
window.currentWaistColor = null;
window.currentLegsColor = null;
window.currentFeetColor = null;
window.currentPropsColor = null;

export class PathBuilder {
    buildPath(part, gender, item, animation, currentColorVar, colors, defaultColors = {}) {
        let path = `${basePath}Clothes/${part}/${gender}/${item}`;
        let subfolder = '';

        if (['CloakWithClip', 'CloakWithTie', 'TatteredCloakwithClip', 'TatteredCloakWithTie', 
             'TrimmedCloakWithClip', 'TrimmedCloakWithTie', 'FormalJacket'].includes(item) && part === 'Torso3') {
            subfolder = '/Front';
        }

        const availableColors = colors[gender][item] || [];
        const colorToUse = window[currentColorVar];

        if (colorToUse && availableColors.length > 0 && availableColors.includes(colorToUse)) {
            path += `/${colorToUse}`;
        } else if (availableColors.length === 0) {
            // Нет подкаталога цвета
        } else if (defaultColors[item]) {
            path += `/${defaultColors[item]}`;
            window[currentColorVar] = defaultColors[item];
        } else if (availableColors.length > 0) {
            window[currentColorVar] = availableColors[0];
            path += `/${availableColors[0]}`;
        }

        return `${path}${subfolder}/${animation}.png`;
    }

    getTorsoPath(gender, torso, animation) {
        const defaultColors = {
            'Breastplate': 'Gold', 'LegionPlate': 'Steel', 'Robe': 'Forest', 'Vest': 'Green',
            'Iverness': 'Black', 'Trenchcoat': 'Black', 'CloakWithTie': 'White',
            'TatteredCloakwithClip': 'White', 'TatteredCloakWithTie': 'White',
            'TrimmedCloakWithClip': 'White', 'TrimmedCloakWithTie': 'White'
        };
        let part = 'Torso';
        if (['Apron', 'Bodice', 'Breastplate', 'Corset', 'LeatherChestpiece', 'LegionPlate', 
             'Robe', 'Sweater', 'Tabard', 'Tunic', 'Iverness', 'Trenchcoat', 'Vest'].includes(torso)) {
            part = 'Torso2';
        } else if (['CloakWithClip', 'CloakWithTie', 'TatteredCloakwithClip', 'TatteredCloakWithTie', 
                    'TrimmedCloakWithClip', 'TrimmedCloakWithTie', 'FormalJacket'].includes(torso)) {
            part = 'Torso3';
        }
        return this.buildPath(part, gender, torso, animation, 'currentTorsoColor', torsoColors, defaultColors);
    }

    getHeadPath(gender, head, animation) {
        const defaultColors = { 'LegionHelm1': 'Steel' };
        return this.buildPath('Head', gender, head, animation, 'currentHeadColor', headColors, defaultColors);
    }

    getFacePath(gender, face, animation) {
        return this.buildPath('Face', gender, face, animation, 'currentFaceColor', faceColors);
    }

    getNeckPath(gender, neck, animation) {
        const defaultColors = { 'Scarf': 'Red' };
        return this.buildPath('Neck', gender, neck, animation, 'currentNeckColor', neckColors, defaultColors);
    }

    getArmsPath(gender, arms, animation) {
        const defaultColors = { 'Vambrace': 'Gold' };
        return this.buildPath('Arms', gender, arms, animation, 'currentArmsColor', armsColors, defaultColors);
    }

    getHandsPath(gender, hands, animation) {
        const defaultColors = { 'Gauntlets': 'Gold' };
        return this.buildPath('Hands', gender, hands, animation, 'currentHandsColor', handsColors, defaultColors);
    }

    getShouldersPath(gender, shoulders, animation) {
        return this.buildPath('Shoulders', gender, shoulders, animation, 'currentShouldersColor', shouldersColors);
    }

    getWaistPath(gender, waist, animation) {
        return this.buildPath('Waist', gender, waist, animation, 'currentWaistColor', waistColors);
    }

    getLegsPath(gender, legs, animation) {
        const defaultColors = { 'Greaves': 'Gold', 'Slacks': 'Green', 'TightPants': 'Black', 'StraightSkirt': 'Maroon', 'ShortShorts': 'BlueGray' };
        return this.buildPath('Legs', gender, legs, animation, 'currentLegsColor', legsColors, defaultColors);
    }

    getFeetPath(gender, feet, animation) {
        const defaultColors = { 'ArmoredBoots': 'Gold', 'Shoes': 'Black' };
        return this.buildPath('Feet', gender, feet, animation, 'currentFeetColor', feetColors, defaultColors);
    }

    getPropsPath(gender, props, animation) {
        return this.buildPath('Props', gender, props, animation, 'currentPropsColor', propsColors);
    }

    getWeaponPath(gender, weapon, animation) {
        if (weapon === 'None') return null;

        let category = '';
        if (animation === 'shoot') category = 'Shoot';
        else if (animation === 'swing') category = 'Swing';
        else if (animation === 'thrust') category = 'Thrust';
        else if (animation === 'idle') {
            if (weaponOptions[gender]['Shoot'].includes(weapon)) category = 'Shoot';
            else if (weaponOptions[gender]['Swing'].includes(weapon)) category = 'Swing';
            else if (weaponOptions[gender]['Thrust'].includes(weapon)) category = 'Thrust';
            else return null;
        } else return null;

        const weaponLower = weapon.toLowerCase();
        const matchingWeapon = Object.keys(weaponSpriteSizes).find(key => key.toLowerCase() === weaponLower);
        if (!matchingWeapon) {
            console.warn(`Нет данных о размере спрайта для оружия: ${weapon}`);
            return null;
        }

        const sizeInfo = weaponSpriteSizes[matchingWeapon];
        let path = `${basePath}Weapons/${gender}/${category}/`;
        path += category === 'Swing' ? `${weapon}/${weapon}.png` : `${weapon}.png`;
        return { path, sizeInfo };
    }
}