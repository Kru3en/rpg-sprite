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
    'Human_female': ['hurt', 'idle', 'magic', 'shoot', 'swing', 'thrust', 'walk'],
    'Human_male': ['hurt', 'idle', 'magic', 'shoot', 'swing', 'thrust', 'walk']
};

const hairStyles = {
    'Human_female': [
        'Afro', 'Bangs', 'Bangs Long', 'Bangs Long 2', 'Bangs Short', 'Bedhead', 'Braid', 
        'Bunches', 'Curly', 'Extra Long', 'Extra Long Knot', 'Long', 'Long Hawk', 'Long Knot', 
        'Loose', 'Messy', 'Messy 2', 'Mohawk', 'Page', 'Parted'
    ],
    'Human_male': [
        'Afro', 'Bangs', 'Bangs Long', 'Bangs Short', 'Bedhead', 'Braid', 'Bunches', 'Curly', 
        'Extra Long', 'Long', 'Long Hawk', 'Loose', 'Messy', 'Mohawk', 'Page', 'Parted'
    ]
};

const hairColors = [
    'Black', 'Blonde', 'Brown', 'Chestnut', 'Gray', 'Green', 'Lavender', 'Orange', 
    'Pink', 'Platinum', 'Red', 'Teal', 'White', 'Yellow'
];

const eyeColors = ['Blue', 'Brown', 'Gray', 'Green', 'Orange', 'Purple', 'Red', 'Yellow'];

const torsoOptions = {
    'Human_female': [
        'Blouse', 'ChainmailShirt', 'IrishDress', 'LongSleeveBlouse', 'LongSleeveShirt', 
        'PirateShirt', 'ScoopNeck', 'SleevelessShirt', 'SlitDress', 'Apron', 'Bodice', 
        'Breastplate', 'Corset', 'LeatherChestpiece', 'LegionPlate', 'Robe', 'Sweater', 
        'Tabard', 'Tunic', 'CloakWithClip', 'CloakWithTie', 'Tattered CloakwithClip', 
        'TatteredCloakWithTie', 'TrimmedCloakWithClip', 'TrimmedCloakWithTie'
    ],
    'Human_male': [
        'ChainmailShirt', 'DressShirt', 'DressShirtWithStripes', 'LongSleeveShirt', 
        'SleevelessShirt', 'Breastplate', 'Iverness', 'LeatherChestpiece', 'Tabard', 
        'Trenchcoat', 'Vest', 'FormalJacket'
    ]
};

const torsoColors = {
    'Human_female': {
        'Blouse': ['Black', 'Blue', 'BlueGray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 
            'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 
            'White', 'Yellow'],
        'ChainmailShirt': [],
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
        'SleevelessShirt': ['Black', 'Blue', 'BlueGray', 'Forest', 'Gray', 'Green', 'Lavender', 
            'Leather', 'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 
            'Walnut', 'White', 'Yellow'],
        'SlitDress': ['Black', 'Blue', 'BlueGray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 
            'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 
            'White', 'Yellow'],
        'Apron': [],
        'Bodice': [],
        'Breastplate': ['Gold', 'Silver'],
        'Corset': ['Black', 'Blue', 'BlueGray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 
            'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 
            'White', 'Yellow'],
        'LeatherChestpiece': [],
        'LegionPlate': ['Steel'],
        'Robe': ['Forest', 'Green', 'Yellow'],
        'Sweater': [],
        'Tabard': [],
        'Tunic': [],
        'CloakWithClip': ['Black', 'Blue', 'BlueGray', 'Forest', 'Gray', 'Green', 'Lavender', 
            'Leather', 'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 
            'Walnut', 'White', 'Yellow'],
        'CloakWithTie': ['White'],
        'TatteredCloakwithClip': ['White'],
        'TatteredCloakWithTie': ['White'],
        'TrimmedCloakWithClip': ['White'],
        'TrimmedCloakWithTie': ['White']
    },
    'Human_male': {
        'ChainmailShirt': [],
        'DressShirt': [],
        'DressShirtWithStripes': [],
        'LongSleeveShirt': ['Black', 'Blue', 'BlueGray', 'Forest', 'Gray', 'Green', 'Lavender', 
            'Leather', 'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 
            'Walnut', 'White', 'Yellow'],
        'SleevelessShirt': [], // Оставляем пустым для мужского персонажа
        'Breastplate': ['Gold', 'Silver'],
        'Iverness': ['Black'],
        'LeatherChestpiece': [],
        'Tabard': [],
        'Trenchcoat': ['Black'],
        'Vest': ['Green'],
        'FormalJacket': []
    }
};

let currentTorsoColor = null;