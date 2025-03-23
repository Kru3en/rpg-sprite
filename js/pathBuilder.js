function getTorsoPath(gender, torso, hairColor, animation) {
    let torsoPath = '';
    let torsoSubfolder = '';

    if (['Blouse', 'Chainmail Shirt', 'Irish Dress', 'Long-Sleeve Blouse', 'Long-Sleeve Shirt', 'Pirate Shirt', 'Scoop Neck', 'Sleeveless Shirt', 'Slit Dress'].includes(torso)) {
        torsoPath = `${basePath}Clothes/Torso/${gender}/${torso}`;
    } else if (['Apron', 'Bodice', 'Breastplate', 'Corset', 'Leather Chestpiece', 'Legion Plate', 'Robe', 'Sweater', 'Tabard', 'Tunic'].includes(torso)) {
        torsoPath = `${basePath}Clothes/Torso 2/${gender}/${torso}`;
    } else if (['Cloak with Clip', 'Cloak with Tie', 'Tattered Cloak with Clip', 'Tattered Cloak with Tie', 'Trimmed Cloak with Clip', 'Trimmed Cloak with Tie'].includes(torso)) {
        torsoPath = `${basePath}Clothes/Torso 3/${gender}/${torso}`;
        torsoSubfolder = '/Front';
    } else if (['Formal Jacket', 'Formal Jacket with Stripes', 'Iverness', 'Trenchcoat', 'Vest', 'Vest with Stripes'].includes(torso)) {
        torsoPath = `${basePath}Clothes/Torso 2/${gender}/${torso}`;
    }

    if (torsoColors[torso] && torsoColors[torso].includes(hairColor)) {
        torsoPath += `/${hairColor}`;
    } else if (torso === 'Breastplate') {
        torsoPath += '/Gold';
    } else if (torso === 'Legion Plate') {
        torsoPath += '/Steel';
    } else if (torso === 'Robe') {
        torsoPath += '/Forest';
    } else if (torso === 'Vest') {
        torsoPath += '/Green';
    } else if (torso === 'Formal Jacket') {
        torsoPath += '/Walnut';
    } else if (torso === 'Iverness' || torso === 'Trenchcoat') {
        torsoPath += '/Black';
    }

    return `${torsoPath}${torsoSubfolder}/${animation}.png`;
}