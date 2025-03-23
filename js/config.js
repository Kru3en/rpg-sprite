const basePath = './assets/sprite/character/';
const directions = ['north', 'east', 'south', 'west'];
const directionRows = {
    'north': 2,
    'east': 17,
    'south': 7,
    'west': 12
};
const frameCounts = {
    'idle': 4,
    'walk': 9,
    'hurt': 6,
    'magic': 7,
    'shoot': 13,
    'swing': 6,
    'thrust': 8,
};
const frameWidth = 64;
const frameHeight = 64;
const animationSpeed = 150;

const animations = {
    'Human_female': ['idle', 'walk', 'hurt', 'magic', 'shoot', 'swing', 'thrust'],
    'Human_male': ['idle', 'walk', 'hurt', 'magic', 'shoot', 'swing', 'thrust']
};

const hairStyles = {
    'Human_female': ['Afro', 'Bangs', 'Bangs Long', 'Bangs Long 2', 'Bangs Short', 'Bedhead', 'Braid', 'Bunches', 'Curly', 'Extra Long', 'Extra Long Knot', 'Long', 'Long Hawk'],
    'Human_male': ['Afro', 'Bangs', 'Bangs Long', 'Bangs Long 2', 'Bangs Short', 'Bedhead', 'Braid', 'Bunches', 'Curly', 'Extra Long', 'Extra Long Knot', 'Long', 'Long Hawk']
};

const hairColors = ['Black', 'Blonde', 'Brown', 'Chestnut', 'Gray', 'Green', 'Lavender', 'Orange', 'Pink', 'Platinum', 'Red', 'Teal', 'White', 'Yellow'];
const eyeColors = ['Blue', 'Brown', 'Full Black', 'Gray', 'Green', 'Orange', 'Purple', 'Red', 'Yellow'];

const torsoOptions = {
    'Human_female': [
        'Blouse', 'Chainmail Shirt', 'Irish Dress', 'Long-Sleeve Blouse', 'Long-Sleeve Shirt', 'Pirate Shirt', 'Scoop Neck', 'Sleeveless Shirt', 'Slit Dress',
        'Apron', 'Bodice', 'Breastplate', 'Corset', 'Leather Chestpiece', 'Legion Plate', 'Robe', 'Sweater', 'Tabard', 'Tunic',
        'Cloak with Clip', 'Cloak with Tie', 'Tattered Cloak with Clip', 'Tattered Cloak with Tie', 'Trimmed Cloak with Clip', 'Trimmed Cloak with Tie'
    ],
    'Human_male': [
        'Chainmail Shirt', 'Dress Shirt', 'Dress Shirt with Stripes', 'Long-Sleeve Shirt', 'Sleeveless Shirt',
        'Breastplate', 'Leather Chestpiece', 'Tabard', 'Vest', 'Vest with Stripes',
        'Formal Jacket', 'Formal Jacket with Stripes', 'Iverness', 'Trenchcoat'
    ]
};

const torsoColors = {
    'Blouse': ['Black', 'Blue', 'Blue Gray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 'White', 'Yellow'],
    'Irish Dress': ['Black', 'Blue', 'Blue Gray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 'White', 'Yellow'],
    'Long-Sleeve Blouse': ['Black', 'Blue', 'Blue Gray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 'White', 'Yellow'],
    'Long-Sleeve Shirt': ['Black', 'Blue', 'Blue Gray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 'White', 'Yellow'],
    'Pirate Shirt': ['Black', 'Blue', 'Blue Gray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 'White', 'Yellow'],
    'Scoop Neck': ['Black', 'Blue', 'Blue Gray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 'White', 'Yellow'],
    'Sleeveless Shirt': ['Black', 'Blue', 'Blue Gray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 'White', 'Yellow'],
    'Slit Dress': ['Black', 'Blue', 'Blue Gray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 'White', 'Yellow'],
    'Corset': ['Black', 'Blue', 'Blue Gray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 'White', 'Yellow'],
    'Cloak with Clip': ['Black', 'Blue', 'Blue Gray', 'Forest', 'Gray', 'Green', 'Lavender', 'Leather', 'Maroon', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Sky', 'Tan', 'Teal', 'Walnut', 'White', 'Yellow'],
    'Cloak with Tie': ['White'],
    'Tattered Cloak with Clip': ['White'],
    'Tattered Cloak with Tie': ['White'],
    'Trimmed Cloak with Clip': ['White'],
    'Trimmed Cloak with Tie': ['White'],
    'Breastplate': ['Gold', 'Silver'],
    'Legion Plate': ['Steel'],
    'Robe': ['Forest', 'Green', 'Yellow'],
    'Vest': ['Green'],
    'Formal Jacket': ['Walnut'],
    'Iverness': ['Black'],
    'Trenchcoat': ['Black']
};