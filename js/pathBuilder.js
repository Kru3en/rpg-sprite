function getTorsoPath(gender, torso, hairColor, animation) {
    let torsoPath = `${basePath}Clothes/Torso`;
    let torsoSubfolder = '';

    // Определяем подкаталог в зависимости от типа торса
    if (['Blouse', 'ChainmailShirt', 'IrishDress', 'LongSleeveBlouse', 'LongSleeveShirt', 
         'PirateShirt', 'ScoopNeck', 'SleevelessShirt', 'SlitDress'].includes(torso)) {
        torsoPath += `/${gender}/${torso}`;
    } else if (['Apron', 'Bodice', 'Breastplate', 'Corset', 'LeatherChestpiece', 'LegionPlate', 
                'Robe', 'Sweater', 'Tabard', 'Tunic', 'Iverness', 'Trenchcoat', 'Vest'].includes(torso)) {
        torsoPath += `2/${gender}/${torso}`;
    } else if (['CloakWithClip', 'FormalJacket', 'CloakWithTie', 'TatteredCloakWithClip', 
                'TatteredCloakWithTie', 'TrimmedCloakWithClip', 'TrimmedCloakWithTie'].includes(torso)) {
        torsoPath += `3/${gender}/${torso}`;
        torsoSubfolder = '/Front'; // Для плащей используется подкаталог Front
    } else {
        torsoPath += `/${gender}/${torso}`; // На случай новых типов торса
    }

    // Добавляем цвет, если он доступен
    if (torsoColors[torso] && torsoColors[torso].includes(hairColor)) {
        torsoPath += `/${hairColor}`;
    } else if (torso === 'Breastplate') {
        torsoPath += '/Gold'; // По умолчанию Gold
    } else if (torso === 'LegionPlate') {
        torsoPath += '/Steel';
    } else if (torso === 'Robe') {
        torsoPath += '/Forest'; // По умолчанию Forest
    } else if (torso === 'Vest') {
        torsoPath += '/Green';
    }  else if (torso === 'Iverness' || torso === 'Trenchcoat') {
        torsoPath += '/Black';
    } else if (['CloakWithTie', 'TatteredCloakWithClip', 'TatteredCloakWithTie', 
                'TrimmedCloakWithClip', 'TrimmedCloakWithTie'].includes(torso)) {
        torsoPath += '/White';
    }

    // Формируем полный путь к файлу анимации
    return `${torsoPath}${torsoSubfolder}/${animation}.png`;
}