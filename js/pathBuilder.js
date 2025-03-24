function getTorsoPath(gender, torso, animation) {
    let torsoPath = `${basePath}Clothes/Torso`;
    let torsoSubfolder = '';

    if (['Blouse', 'ChainmailShirt', 'IrishDress', 'LongSleeveBlouse', 'LongSleeveShirt', 
         'PirateShirt', 'ScoopNeck', 'SleevelessShirt', 'SlitDress'].includes(torso)) {
        torsoPath += `/${gender}/${torso}`;
    } else if (['Apron', 'Bodice', 'Breastplate', 'Corset', 'LeatherChestpiece', 'LegionPlate', 
                'Robe', 'Sweater', 'Tabard', 'Tunic', 'Iverness', 'Trenchcoat', 'Vest'].includes(torso)) {
        torsoPath += `2/${gender}/${torso}`;
    } else if (['CloakWithClip', 'CloakWithTie', 'TatteredCloakwithClip', 'TatteredCloakWithTie', 
                'TrimmedCloakWithClip', 'TrimmedCloakWithTie', 'FormalJacket'].includes(torso)) {
        torsoPath += `3/${gender}/${torso}`;
        torsoSubfolder = '/Front';
    } else {
        torsoPath += `/${gender}/${torso}`;
    }

    // Используем currentTorsoColor, если он задан, иначе проверяем дефолтные значения
    if (currentTorsoColor && torsoColors[gender][torso]?.length > 0 && torsoColors[gender][torso].includes(currentTorsoColor)) {
        torsoPath += `/${currentTorsoColor}`;
    } else if (torsoColors[gender][torso]?.length === 0 && currentTorsoColor) {
        // Нет подкаталога цвета
    } else if (torso === 'Breastplate') {
        torsoPath += '/Gold';
        currentTorsoColor = 'Gold';
    } else if (torso === 'LegionPlate') {
        torsoPath += '/Steel';
        currentTorsoColor = 'Steel';
    } else if (torso === 'Robe') {
        torsoPath += '/Forest';
        currentTorsoColor = 'Forest';
    } else if (torso === 'Vest') {
        torsoPath += '/Green';
        currentTorsoColor = 'Green';
    } else if (torso === 'Iverness' || torso === 'Trenchcoat') {
        torsoPath += '/Black';
        currentTorsoColor = 'Black';
    } else if (['CloakWithTie', 'TatteredCloakwithClip', 'TatteredCloakWithTie', 
                'TrimmedCloakWithClip', 'TrimmedCloakWithTie'].includes(torso)) {
        torsoPath += '/White';
        currentTorsoColor = 'White';
    } else if (torsoColors[gender][torso]?.length > 0) {
        // Если цвет не выбран, берём первый доступный
        currentTorsoColor = torsoColors[gender][torso][0];
        torsoPath += `/${currentTorsoColor}`;
    }

    return `${torsoPath}${torsoSubfolder}/${animation}.png`;
}