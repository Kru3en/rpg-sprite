export const weaponSpriteSizes = {
    'GlowswordBlue': { width: 1152, height: 768, cols: 6, rows: 4 },
    'GlowswordRed': { width: 1152, height: 768, cols: 6, rows: 4 },
    'Greatsword': { width: 1152, height: 768, cols: 6, rows: 4 },
    'Dagger': { width: 384, height: 256, cols: 6, rows: 4 },
    'Mace': { width: 768, height: 512, cols: 6, rows: 4 },
    'Rapier': { width: 1152, height: 768, cols: 6, rows: 4 },
    'Sabre': { width: 768, height: 512, cols: 6, rows: 4 },
    'ShortSword': { width: 384, height: 256, cols: 6, rows: 4 },
    'WandSteel': { width: 385, height: 257, cols: 6, rows: 4 },
    'WandWood': { width: 385, height: 257, cols: 6, rows: 4 },
    'greatbow': { width: 1664, height: 512, cols: 13, rows: 4 },
    'recurve': { width: 1664, height: 512, cols: 13, rows: 4 },
    'ShortBow': { width: 832, height: 256, cols: 13, rows: 4 },
    'cane': { width: 512, height: 254, cols: 8, rows: 4 },
    'dragonspear': { width: 1536, height: 768, cols: 8, rows: 4 },
    'spear': { width: 512, height: 256, cols: 8, rows: 4 },
    'staff': { width: 512, height: 256, cols: 8, rows: 4 },
    'trident': { width: 1536, height: 768, cols: 8, rows: 4 }
};

export const weaponOptions = {
    'Human_female': {
        'Shoot': ['None', 'greatbow', 'recurve', 'ShortBow'],
        'Swing': ['None', 'Dagger', 'GlowswordBlue', 'GlowswordRed', 'Greatsword', 'Mace', 'Rapier', 'Sabre', 'ShortSword', 'WandSteel', 'WandWood'],
        'Thrust': ['None', 'cane', 'dragonspear', 'spear', 'staff', 'trident'],
        'default': ['None']
    },
    'Human_male': {
        'Shoot': ['None', 'ShortBow', 'greatbow', 'recurve'],
        'Swing': ['None', 'Dagger', 'GlowswordBlue', 'GlowswordRed', 'Greatsword', 'Mace', 'Rapier', 'Sabre', 'ShortSword', 'WandSteel', 'WandWood'],
        'Thrust': ['None', 'cane', 'dragonspear', 'spear', 'staff', 'trident'],
        'default': ['None']
    }
};