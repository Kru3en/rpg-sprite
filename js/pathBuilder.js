// Универсальная функция для построения пути
function buildPath(part, gender, item, animation, currentColor, colors, defaultColors = {}) {
    let path = `${basePath}Clothes/${part}/${gender}/${item}`;
    let subfolder = '';

    if (['CloakWithClip', 'CloakWithTie', 'TatteredCloakwithClip', 'TatteredCloakWithTie', 
         'TrimmedCloakWithClip', 'TrimmedCloakWithTie', 'FormalJacket'].includes(item) && part === 'Torso3') {
        subfolder = '/Front';
    }

    const availableColors = colors[gender][item] || [];
    const colorToUse = window[currentColor]; // Используем глобальную переменную напрямую

    if (colorToUse && availableColors.length > 0 && availableColors.includes(colorToUse)) {
        path += `/${colorToUse}`;
    } else if (availableColors.length === 0) {
        // Нет подкаталога цвета
    } else if (defaultColors[item]) {
        path += `/${defaultColors[item]}`;
        window[currentColor] = defaultColors[item]; // Обновляем глобальную переменную
    } else if (availableColors.length > 0) {
        window[currentColor] = availableColors[0];
        path += `/${availableColors[0]}`;
    }

    return `${path}${subfolder}/${animation}.png`;
}

function getTorsoPath(gender, torso, animation) {
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
    return buildPath(part, gender, torso, animation, 'currentTorsoColor', torsoColors, defaultColors);
}

function getHeadPath(gender, head, animation) {
    const defaultColors = { 'LegionHelm1': 'Steel' };
    return buildPath('Head', gender, head, animation, 'currentHeadColor', headColors, defaultColors);
}

function getFacePath(gender, face, animation) {
    return buildPath('Face', gender, face, animation, 'currentFaceColor', faceColors);
}

function getNeckPath(gender, neck, animation) {
    const defaultColors = { 'Scarf': 'Red' };
    return buildPath('Neck', gender, neck, animation, 'currentNeckColor', neckColors, defaultColors);
}

function getArmsPath(gender, arms, animation) {
    const defaultColors = { 'Vambrace': 'Gold' };
    return buildPath('Arms', gender, arms, animation, 'currentArmsColor', armsColors, defaultColors);
}

function getHandsPath(gender, hands, animation) {
    const defaultColors = { 'Gauntlets': 'Gold' };
    return buildPath('Hands', gender, hands, animation, 'currentHandsColor', handsColors, defaultColors);
}

function getShouldersPath(gender, shoulders, animation) {
    return buildPath('Shoulders', gender, shoulders, animation, 'currentShouldersColor', shouldersColors);
}

function getWaistPath(gender, waist, animation) {
    return buildPath('Waist', gender, waist, animation, 'currentWaistColor', waistColors);
}

function getLegsPath(gender, legs, animation) {
    const defaultColors = { 'Greaves': 'Gold', 'Slacks': 'Green', 'TightPants': 'Black', 'StraightSkirt': 'Maroon', 'ShortShorts': 'BlueGray' };
    return buildPath('Legs', gender, legs, animation, 'currentLegsColor', legsColors, defaultColors);
}

function getFeetPath(gender, feet, animation) {
    const defaultColors = { 'ArmoredBoots': 'Gold', 'Shoes': 'Black' };
    return buildPath('Feet', gender, feet, animation, 'currentFeetColor', feetColors, defaultColors);
}

function getPropsPath(gender, props, animation) {
    return buildPath('Props', gender, props, animation, 'currentPropsColor', propsColors);
}

function getWeaponPath(gender, weapon, animation) {
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
    const matchingWeapon = Object.keys(weaponSpriteSizes).find(
        key => key.toLowerCase() === weaponLower
    );

    if (!matchingWeapon) {
        console.warn(`No sprite size info found for weapon: ${weapon}`);
        return null;
    }

    const sizeInfo = weaponSpriteSizes[matchingWeapon];
    let path = `${basePath}Weapons/${gender}/${category}/`;

    // Для Swing добавляем подпапку с именем оружия
    if (category === 'Swing') {
        path += `${weapon}/${weapon}.png`;
    } else {
        // Для Shoot и Thrust файл лежит прямо в папке категории
        path += `${weapon}.png`;
    }

    console.log(`Generated weapon path: ${path}`);
    return { path, sizeInfo };
}