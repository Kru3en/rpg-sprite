const basePath = './assets/sprite/character/';
const directions = ['north', 'east', 'south', 'west'];
const directionRows = {
    'north': 0,
    'east': 2,
    'south': 1,
    'west': 3
};
const frameCounts = {
    'idle': 3,
    'walk': 8,
    'hurt': 6,
    'magic': 7,
    'shoot': 13,
    'swing': 6,
    'thrust': 8,
};
const frameWidth = 64;
const frameHeight = 64;
const animationSpeed = 300;

const animations = {
    'Human_female': ['idle', 'walk', 'hurt', 'magic', 'shoot', 'swing', 'thrust'],
    'Human_male': ['idle', 'walk', 'hurt', 'magic', 'shoot', 'swing', 'thrust']
};

const hairStyles = {
    'Human_female': [
        'Afro', 'Bangs', 'BangsLong', 'BangsLong2', 'BangsShort', 'Bedhead', 'Braid', 
        'Bunches', 'Curly', 'ExtraLong', 'ExtraLongKnot', 'Long', 'LongHawk', 'LongKnot', 
        'Loose', 'Messy', 'Messy2', 'Mohawk', 'Page', 'Parted'
    ],
    'Human_male': [
        'Afro', 'Bangs', 'BangsLong', 'BangsShort', 'Bedhead', 'Braid', 'Bun', 'Buzzcut', 
        'ExtraLong', 'Long', 'LongHawk', 'Loose', 'Messy', 'Mohawk', 'Page', 'Parted', 
        'Ponytail', 'Short', 'Shortknot', 'SideRazor', 'SideRazorLong', 'WidowsPeak'
    ]
};

const hairColors = [
    'Black', 'Blonde', 'Brown', 'Chestnut', 'Gray', 'Green', 'Lavender', 'Orange', 
    'Pink', 'Platinum', 'Red', 'Teal', 'White', 'Yellow'
];

const eyeColors = ['Blue', 'Brown', 'FullBlack', 'Gray', 'Green', 'Orange', 'Purple', 'Red', 'Yellow'];

const torsoOptions = {
    'Human_female': [
        'Blouse', 'ChainmailShirt', 'IrishDress', 'LongSleeveBlouse', 'LongSleeveShirt', 
        'PirateShirt', 'ScoopNeck', 'SleevelessShirt', 'SlitDress', 'Apron', 'Bodice', 
        'Breastplate', 'Corset', 'LeatherChestpiece', 'LegionPlate', 'Robe', 'Sweater', 
        'Tabard', 'Tunic', 'CloakWithClip', 'CloakWithTie', 'TatteredCloakWithClip', 
        'TatteredCloakWithTie', 'TrimmedCloakWithClip', 'TrimmedCloakWithTie'
    ],
    'Human_male': [
        'ChainmailShirt', 'DressShirt', 'DressShirtWithStripes', 'LongSleeveShirt', 
        'SleevelessShirt', 'Breastplate', 'LeatherChestpiece', 'Tabard', 'Vest', 
        'FormalJacket', 'Iverness', 
        'Trenchcoat', 'Sweater'
    ]
};

const torsoColors = {
    'Blouse': ['Black', 'Blue', 'BlueGray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 
        'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 
        'White', 'Yellow'],
    'IrishDress': ['Black', 'Blue', 'BlueGray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 
        'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 
        'White', 'Yellow'],
    'LongSleeveBlouse': ['Black', 'Blue', 'BlueGray', 'Forest', 'Gray', 'Green', 'Lavender', 
        'Leather', 'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 
        'Walnut', 'White', 'Yellow'],
    'LongSleeveShirt': ['Black', 'Blue', 'BlueGray', 'Forest', 'Gray', 'Green', 'Lavender', 
        'Leather', 'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 
        'Walnut', 'White', 'Yellow'],
    'PirateShirt': ['Black', 'Blue', 'BlueGray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 
        'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 
        'White', 'Yellow'],
    'ScoopNeck': ['Black', 'Blue', 'BlueGray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 
        'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 
        'White', 'Yellow'],
    'SlitDress': ['Black', 'Blue', 'BlueGray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 
        'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 
        'White', 'Yellow'],
    'Corset': ['Black', 'Blue', 'BlueGray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 
        'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 
        'White', 'Yellow'],
    'CloakWithClip': ['Black', 'Blue', 'BlueGray', 'Forest', 'Gray', 'Green', 'Lavender', 
        'Leather', 'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 
        'Walnut', 'White', 'Yellow'],
    'CloakWithTie': ['White'],
    'TatteredCloakWithClip': ['White'],
    'TatteredCloakWithTie': ['White'],
    'TrimmedCloakWithClip': ['White'],
    'TrimmedCloakWithTie': ['White'],
    'Breastplate': ['Gold', 'Silver'],
    'LegionPlate': ['Steel'],
    'Robe': ['Forest', 'Green', 'Yellow'],
    'Vest': ['Green'],
    'FormalJacket': [],
    'Iverness': ['Black'],
    'Trenchcoat': ['Black'],
    'ChainmailShirt': [],
    'DressShirt': [],
    'DressShirtWithStripes': [],
    'LeatherChestpiece': [],
    'Tabard': [],
    'Tunic': [],
    'Apron': [],
    'Bodice': [],
    'Sweater': [],

};