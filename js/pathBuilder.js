// Универсальная функция для построения пути
function buildPath(part, gender, item, animation, currentColor, colors, defaultColors = {}) {
    let path = `${basePath}Clothes/${part}/${gender}/${item}`;
    let subfolder = '';

    // Проверяем, есть ли специальные папки (например, Front/Back для Cloak)
    if (['CloakWithClip', 'CloakWithTie', 'TatteredCloakwithClip', 'TatteredCloakWithTie', 
         'TrimmedCloakWithClip', 'TrimmedCloakWithTie', 'FormalJacket'].includes(item) && part === 'Torso3') {
        subfolder = '/Front';
    }

    // Проверяем доступные цвета
    if (currentColor && colors[gender][item]?.length > 0 && colors[gender][item].includes(currentColor)) {
        path += `/${currentColor}`;
    } else if (colors[gender][item]?.length === 0) {
        // Нет подкаталога цвета
    } else if (defaultColors[item]) {
        path += `/${defaultColors[item]}`;
        window[currentColor] = defaultColors[item];
    } else if (colors[gender][item]?.length > 0) {
        window[currentColor] = colors[gender][item][0];
        path += `/${colors[gender][item][0]}`;
    }

    return `${path}${subfolder}/${animation}.png`;
}

function getTorsoPath(gender, torso, animation) {
    let torsoPath = `${basePath}Clothes/Torso`;
    if (['Blouse', 'ChainmailShirt', 'IrishDress', 'LongSleeveBlouse', 'LongSleeveShirt', 
         'PirateShirt', 'ScoopNeck', 'SleevelessShirt', 'SlitDress'].includes(torso)) {
        torsoPath += `/${gender}/${torso}`;
    } else if (['Apron', 'Bodice', 'Breastplate', 'Corset', 'LeatherChestpiece', 'LegionPlate', 
                'Robe', 'Sweater', 'Tabard', 'Tunic', 'Iverness', 'Trenchcoat', 'Vest'].includes(torso)) {
        torsoPath += `2/${gender}/${torso}`;
    } else if (['CloakWithClip', 'CloakWithTie', 'TatteredCloakwithClip', 'TatteredCloakWithTie', 
                'TrimmedCloakWithClip', 'TrimmedCloakWithTie', 'FormalJacket'].includes(torso)) {
        torsoPath += `3/${gender}/${torso}`;
    } else {
        torsoPath += `/${gender}/${torso}`;
    }

    const defaultColors = {
        'Breastplate': 'Gold',
        'LegionPlate': 'Steel',
        'Robe': 'Forest',
        'Vest': 'Green',
        'Iverness': 'Black',
        'Trenchcoat': 'Black',
        'CloakWithTie': 'White',
        'TatteredCloakwithClip': 'White',
        'TatteredCloakWithTie': 'White',
        'TrimmedCloakWithClip': 'White',
        'TrimmedCloakWithTie': 'White'
    };

    let subfolder = '';
    if (['CloakWithClip', 'CloakWithTie', 'TatteredCloakwithClip', 'TatteredCloakWithTie', 
         'TrimmedCloakWithClip', 'TrimmedCloakWithTie', 'FormalJacket'].includes(torso)) {
        subfolder = '/Front';
    }

    if (currentTorsoColor && torsoColors[gender][torso]?.length > 0 && torsoColors[gender][torso].includes(currentTorsoColor)) {
        torsoPath += `/${currentTorsoColor}`;
    } else if (torsoColors[gender][torso]?.length === 0 && currentTorsoColor) {
        // Нет подкаталога цвета
    } else if (defaultColors[torso]) {
        torsoPath += `/${defaultColors[torso]}`;
        currentTorsoColor = defaultColors[torso];
    } else if (torsoColors[gender][torso]?.length > 0) {
        currentTorsoColor = torsoColors[gender][torso][0];
        torsoPath += `/${torsoColors[gender][torso][0]}`;
    }

    return `${torsoPath}${subfolder}/${animation}.png`;
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