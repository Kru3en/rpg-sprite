export class AssetLoader {
    constructor() {
        this.basePath = './assets/sprite/';
        this.cache = new Map();
    }

    async loadSprite(path) {
        if (this.cache.has(path)) {
            return this.cache.get(path);
        }

        const img = new Image();
        return new Promise((resolve, reject) => {
            img.onload = () => {
                this.cache.set(path, img);
                resolve(img);
            };
            img.onerror = () => reject(new Error(`Failed to load image: ${path}`));
            img.src = this.basePath + path;
        });
    }

    getSpritePath(part, config) {
        const { gender, bodyType, skinColor, earStyle, eyeColor, expression, animation } = config;

        // Определение гендерной папки
        let genderFolder;
        switch (gender) {
            case 'male':
                genderFolder = bodyType === 'muscular' ? 'Human_male_muscular' : 'Human_male';
                break;
            case 'female':
                genderFolder = bodyType === 'pregnant' ? 'Human_female_pregnant' : 'Human_female';
                break;
            case 'androgynous':
                genderFolder = 'Human_androgynous';
                break;
            case 'child':
                genderFolder = 'Human_child';
                break;
            case 'orc':
                genderFolder = 'Orc_male';
                break;
            case 'skeleton':
                genderFolder = 'Skeleton';
                break;
            default:
                genderFolder = 'Human_male';
        }

        // Корректировка для глаз
        let eyesGenderFolder = genderFolder;
        if (part === 'eyes') {
            if (!['Human_child', 'Human_female', 'Human_male'].includes(genderFolder)) {
                return null; // Глаза недоступны для orc, skeleton, androgynous
            }
        }

        // Корректировка для ушей
        let earsGenderFolder = genderFolder;
        if (part === 'ears') {
            if (!['Human_child', 'Human_female', 'Human_male'].includes(genderFolder)) {
                return null; // Уши недоступны для orc, skeleton, androgynous
            }
            // Для Human_child уши имеют только idle и walk
            if (earsGenderFolder === 'Human_child' && !['idle', 'walk'].includes(animation)) {
                return null;
            }
        }

        // Валидные значения
        const validSkinColors = {
            Human_male: ['Coffee', 'Comet', 'Copper', 'Dove', 'Gold', 'Gray', 'Ivory', 'Sienna'],
            Human_male_muscular: ['Coffee', 'Comet', 'Copper', 'Dove', 'Gold', 'Gray', 'Ivory', 'Sienna'],
            Human_female: ['Coffee', 'Comet', 'Copper', 'Dove', 'Gold', 'Gray', 'Ivory', 'Light Green', 'Sienna'],
            Human_female_pregnant: ['Coffee', 'Comet', 'Copper', 'Dove', 'Gold', 'Gray', 'Ivory', 'Light Green', 'Sienna'],
            Human_androgynous: ['Coffee', 'Comet', 'Copper', 'Dove', 'Gold', 'Gray', 'Ivory', 'Light Green', 'Sienna'],
            Human_child: ['Coffee', 'Comet', 'Copper', 'Dove', 'Gold', 'Gray', 'Ivory', 'Sienna'],
            Orc_male: ['none'],
            Skeleton: ['none']
        };

        const validEyeColors = ['Blue', 'Brown', 'Full Black', 'Gray', 'Green', 'Orange', 'Purple', 'Red', 'Yellow'];
        const validExpressions = ['Angry', 'Crying', 'Happy', 'Sad'];

        // Валидные стили ушей в зависимости от гендера
        const validEarStyles = {
            Human_child: ['Big', 'Pointed', 'PointedLong'],
            Human_female: ['Big', 'Pointed'], // PointedLong отсутствует
            Human_male: ['Big', 'Pointed', 'PointedLong']
        };

        switch (part) {
            case 'body':
                if (genderFolder === 'Orc_male' || genderFolder === 'Skeleton') {
                    return `character/Body/Base/${genderFolder}/${animation}.png`;
                }
                if (!validSkinColors[genderFolder].includes(skinColor)) return null;
                return `character/Body/Base/${genderFolder}/${skinColor}/${animation}.png`;

            case 'ears':
                if (earStyle === 'none' || !validEarStyles[earsGenderFolder]?.includes(earStyle)) {
                    return null; // Стиль ушей недоступен для этого гендера
                }
                if (earsGenderFolder === 'Human_male') {
                    // Human_male не использует skinColor для ушей
                    return `character/Body/Ears/${earsGenderFolder}/${earStyle}/${animation}.png`;
                }
                if (!validSkinColors[earsGenderFolder].includes(skinColor)) {
                    return null; // Цвет кожи недоступен для ушей этого гендера
                }
                return `character/Body/Ears/${earsGenderFolder}/${earStyle}/${skinColor}/${animation}.png`;

            case 'eyes':
                if (!validEyeColors.includes(eyeColor)) return null;
                return `character/Body/Eyes/${eyesGenderFolder}/${eyeColor}/${animation}.png`;

            case 'expression':
                if (expression === 'none' || !validExpressions.includes(expression)) return null;
                if (!['Human_female', 'Human_male'].includes(genderFolder)) return null;
                if (!validSkinColors[genderFolder].includes(skinColor)) return null;
                return `character/Expression/${genderFolder}/${expression}/${skinColor}/${animation}.png`;

            default:
                return null;
        }
    }
}