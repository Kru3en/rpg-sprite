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

// Torso configs (оставляем как есть)
const torsoOptions = {
    'Human_female': [
        'Blouse', 'ChainmailShirt', 'IrishDress', 'LongSleeveBlouse', 'LongSleeveShirt', 
        'PirateShirt', 'ScoopNeck', 'SleevelessShirt', 'SlitDress', 'Apron', 'Bodice', 
        'Breastplate', 'Corset', 'LeatherChestpiece', 'LegionPlate', 'Robe', 'Sweater', 
        'Tabard', 'Tunic', 'CloakWithClip', 'CloakWithTie', 'TatteredCloakwithClip', 
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
        'SleevelessShirt': [],
        'Breastplate': ['Gold', 'Silver'],
        'Iverness': ['Black'],
        'LeatherChestpiece': [],
        'Tabard': [],
        'Trenchcoat': ['Black'],
        'Vest': ['Green'],
        'FormalJacket': []
    }
};

// Глобальные переменные для текущих цветов
let currentTorsoColor = null;
let currentHeadColor = null;
let currentFaceColor = null;
let currentNeckColor = null;
let currentArmsColor = null;
let currentHandsColor = null;
let currentShouldersColor = null;
let currentWaistColor = null;
let currentLegsColor = null;
let currentFeetColor = null;
let currentPropsColor = null;

// Head configs
const headOptions = {
    'Human_female': [
        'None', 'ChainHood', 'FeatherCap', 'FullHelm', 'KettleHelmet', 'KettleHood', 
        'LeatherHood', 'LegionHelm1', 'MagicianHat', 'SpikedHelm', 'Tiara'
    ],
    'Human_male': [
        'None', 'Bowler', 'ChainHood', 'FeatherCap', 'FullHelm', 'KettleHelmet', 
        'KettleHood', 'LeatherHood', 'SpikedHelm', 'TopHat'
    ]
};

const headColors = {
    'Human_female': {
        'None': [],
        'ChainHood': [],
        'FeatherCap': [],
        'FullHelm': [],
        'KettleHelmet': [],
        'KettleHood': [],
        'LeatherHood': [],
        'LegionHelm1': ['Steel'],
        'MagicianHat': [],
        'SpikedHelm': [],
        'Tiara': []
    },
    'Human_male': {
        'None': [],
        'Bowler': [],
        'ChainHood': [],
        'FeatherCap': [],
        'FullHelm': [],
        'KettleHelmet': [],
        'KettleHood': [],
        'LeatherHood': [],
        'SpikedHelm': [],
        'TopHat': []
    }
};

// Face configs
const faceOptions = {
    'Human_female': [
        'None', 'FormalGlasses', 'Mask', 'Monocle', 'NerdGlasses', 'SecretaryGlasses', 'Sunglasses'
    ],
    'Human_male': [
        'None', 'FormalGlasses', 'Mask', 'Monocle', 'NerdGlasses', 'SecretaryGlasses', 'Sunglasses'
    ]
};

const faceColors = {
    'Human_female': {
        'None': [],
        'FormalGlasses': [],
        'Mask': [],
        'Monocle': [],
        'NerdGlasses': [],
        'SecretaryGlasses': [],
        'Sunglasses': []
    },
    'Human_male': {
        'None': [],
        'FormalGlasses': [],
        'Mask': [],
        'Monocle': [],
        'NerdGlasses': [],
        'SecretaryGlasses': [],
        'Sunglasses': []
    }
};

// Neck configs
const neckOptions = {
    'Human_female': [
        'None', 'Necklace', 'Pendant'
    ],
    'Human_male': [
        'None', 'Bowtie', 'Scarf', 'Tie'
    ]
};

const neckColors = {
    'Human_female': {
        'None': [],
        'Necklace': [],
        'Pendant': []
    },
    'Human_male': {
        'None': [],
        'Bowtie': [],
        'Scarf': ['Red'],
        'Tie': []
    }
};

// Arms configs
const armsOptions = {
    'Human_female': [
        'None', 'Bracers', 'Vambrace'
    ],
    'Human_male': [
        'None', 'Bracers', 'Vambrace'
    ]
};

const armsColors = {
    'Human_female': {
        'None': [],
        'Bracers': [],
        'Vambrace': ['Gold', 'Silver']
    },
    'Human_male': {
        'None': [],
        'Bracers': [],
        'Vambrace': ['Gold', 'Silver']
    }
};

// Hands configs
const handsOptions = {
    'Human_female': [
        'None', 'Gauntlets'
    ],
    'Human_male': [
        'None', 'Gauntlets'
    ]
};

const handsColors = {
    'Human_female': {
        'None': [],
        'Gauntlets': ['Gold', 'Silver']
    },
    'Human_male': {
        'None': [],
        'Gauntlets': ['Gold', 'Silver']
    }
};

// Shoulders configs
const shouldersOptions = {
    'Human_female': [
        'None', 'Pauldrons'
    ],
    'Human_male': [
        'None', 'Pauldrons', 'SingleShoulder'
    ]
};

const shouldersColors = {
    'Human_female': {
        'None': [],
        'Pauldrons': []
    },
    'Human_male': {
        'None': [],
        'Pauldrons': [],
        'SingleShoulder': []
    }
};

// Waist configs
const waistOptions = {
    'Human_female': [
        'None', 'ClothBelt', 'LeatherBelt'
    ],
    'Human_male': [
        'None', 'ClothBelt', 'FormalBelt', 'LeatherBelt'
    ]
};

const waistColors = {
    'Human_female': {
        'None': [],
        'ClothBelt': [],
        'LeatherBelt': []
    },
    'Human_male': {
        'None': [],
        'ClothBelt': [],
        'FormalBelt': [],
        'LeatherBelt': []
    }
};

// Legs configs
const legsOptions = {
    'Human_female': [
        'None', 'BelleSkirt', 'Greaves', 'LegionSkirt', 'Pants', 'ShortShorts', 'SlitSkirt', 'StraightSkirt'
    ],
    'Human_male': [
        'None', 'BaggyPants', 'Greaves', 'RobeSkirt', 'Slacks', 'SlacksWithStripes', 'TightPants'
    ]
};

const legsColors = {
    'Human_female': {
        'None': [],
        'BelleSkirt': ['Black', 'Blue', 'BlueGray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 
            'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 'White', 'Yellow'],
        'Greaves': ['Gold', 'Silver'],
        'LegionSkirt': [],
        'Pants': ['Black', 'Blue', 'BlueGray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 
            'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 'White', 'Yellow'],
        'ShortShorts': ['BlueGray'],
        'SlitSkirt': ['Black', 'Blue', 'BlueGray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 
            'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 'White', 'Yellow'],
        'StraightSkirt': ['Maroon']
    },
    'Human_male': {
        'None': [],
        'BaggyPants': [],
        'Greaves': ['Gold', 'Silver'],
        'RobeSkirt': [],
        'Slacks': ['Green'],
        'SlacksWithStripes': [],
        'TightPants': ['Black', 'Blue']
    }
};

// Feet configs
const feetOptions = {
    'Human_female': [
        'None', 'ArmoredBoots', 'Ghillies', 'LongBoots', 'Sandals', 'Shoes', 'Slippers'
    ],
    'Human_male': [
        'None', 'ArmoredBoots', 'Shoes'
    ]
};

const feetColors = {
    'Human_female': {
        'None': [],
        'ArmoredBoots': ['Gold', 'Silver'],
        'Ghillies': [],
        'LongBoots': [],
        'Sandals': [],
        'Shoes': ['Black', 'Blue', 'BlueGray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 
            'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 'White', 'Yellow'],
        'Slippers': []
    },
    'Human_male': {
        'None': [],
        'ArmoredBoots': ['Gold', 'Silver'],
        'Shoes': ['Brown']
    }
};

// Props configs
const propsOptions = {
    'Human_female': ['None'],
    'Human_male': ['None', 'Cane']
};

const propsColors = {
    'Human_female': {
        'None': []
    },
    'Human_male': {
        'None': [],
        'Cane': []
    }
};