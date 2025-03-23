export class UIController {
    constructor(model, assetLoader, renderer, animation) {
        this.model = model;
        this.assetLoader = assetLoader;
        this.renderer = renderer;
        this.animation = animation;
        this.options = {
            gender: ['male', 'female', 'androgynous', 'child', 'orc', 'skeleton'],
            bodyType: {
                male: ['normal', 'muscular'],
                female: ['normal', 'pregnant'],
                androgynous: ['normal'],
                child: ['normal'],
                orc: ['normal'],
                skeleton: ['normal']
            },
            skinColor: {
                male: ['Coffee', 'Comet', 'Copper', 'Dove', 'Gold', 'Gray', 'Ivory', 'Sienna'],
                female: ['Coffee', 'Comet', 'Copper', 'Dove', 'Gold', 'Gray', 'Ivory', 'Light Green', 'Sienna'],
                androgynous: ['Coffee', 'Comet', 'Copper', 'Dove', 'Gold', 'Gray', 'Ivory', 'Light Green', 'Sienna'],
                child: ['Coffee', 'Comet', 'Copper', 'Dove', 'Gold', 'Gray', 'Ivory', 'Sienna'],
                orc: ['none'],
                skeleton: ['none']
            },
            earStyle: {
                male: ['none', 'Big', 'Pointed', 'PointedLong'],
                female: ['none', 'Big', 'Pointed', 'PointedLong'],
                androgynous: ['none'], // Нет ушей в структуре для androgynous
                child: ['none', 'Big', 'Pointed', 'PointedLong'],
                orc: ['none'], // Уши не указаны для orc
                skeleton: ['none'] // Уши не указаны для skeleton
            },
            eyeColor: ['Blue', 'Brown', 'Full Black', 'Gray', 'Green', 'Orange', 'Purple', 'Red', 'Yellow'],
            expression: {
                male: ['none', 'Angry', 'Crying', 'Happy', 'Sad'],
                female: ['none', 'Angry', 'Crying', 'Happy', 'Sad'],
                androgynous: ['none'], // Нет выражений для androgynous
                child: ['none'], // Нет выражений для child
                orc: ['none'], // Нет выражений для orc
                skeleton: ['none'] // Нет выражений для skeleton
            },
            animation: ['hurt', 'idle', 'magic', 'shoot', 'swing', 'thrust', 'walk']
        };
    }

    async init() {
        this.setupUI();
        this.model.addListener(this.updatePreview.bind(this));
        await this.updatePreview();
    }

    setupUI() {
        const toCamelCase = (str) => str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

        const setupSelect = (id, options, dependent = false) => {
            const select = document.getElementById(id);
            if (!select) {
                console.warn(`Element with ID ${id} not found`);
                return;
            }
            select.innerHTML = '';
            options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt;
                option.textContent = opt;
                select.appendChild(option);
            });
            select.addEventListener('change', () => {
                const key = toCamelCase(id);
                this.model.setProperty(key, select.value);
                if (dependent) {
                    this.updateDependentSelects();
                }
            });
        };

        // Инициализация всех селектов
        setupSelect('gender', this.options.gender, true);
        setupSelect('body-type', this.options.bodyType[this.model.getState().gender || 'male']);
        setupSelect('skin-color', this.options.skinColor[this.model.getState().gender || 'male']);
        setupSelect('ear-style', this.options.earStyle[this.model.getState().gender || 'male']);
        setupSelect('eye-color', this.options.eyeColor);
        setupSelect('expression', this.options.expression[this.model.getState().gender || 'male']);
        setupSelect('animation-type', this.options.animation);

        // Кнопки управления анимацией
        const playButton = document.getElementById('play-animation');
        if (playButton) playButton.addEventListener('click', () => this.animation.play());

        const stopButton = document.getElementById('stop-animation');
        if (stopButton) stopButton.addEventListener('click', () => this.animation.stop());

        this.updateDependentSelects();
    }

    updateDependentSelects() {
        const state = this.model.getState();
        const gender = state.gender || 'male';

        // Обновление bodyType
        const bodyTypeSelect = document.getElementById('body-type');
        if (bodyTypeSelect) {
            bodyTypeSelect.innerHTML = '';
            this.options.bodyType[gender].forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type;
                bodyTypeSelect.appendChild(option);
            });
            bodyTypeSelect.value = state.bodyType || this.options.bodyType[gender][0];
        }

        // Обновление skinColor
        const skinColorSelect = document.getElementById('skin-color');
        if (skinColorSelect) {
            skinColorSelect.innerHTML = '';
            this.options.skinColor[gender].forEach(color => {
                const option = document.createElement('option');
                option.value = color;
                option.textContent = color;
                skinColorSelect.appendChild(option);
            });
            skinColorSelect.value = state.skinColor || this.options.skinColor[gender][0];
        }

        // Обновление earStyle
        const earStyleSelect = document.getElementById('ear-style');
        if (earStyleSelect) {
            earStyleSelect.innerHTML = '';
            this.options.earStyle[gender].forEach(style => {
                const option = document.createElement('option');
                option.value = style;
                option.textContent = style;
                earStyleSelect.appendChild(option);
            });
            earStyleSelect.value = state.earStyle || this.options.earStyle[gender][0];
        }

        // Обновление expression
        const expressionSelect = document.getElementById('expression');
        if (expressionSelect) {
            expressionSelect.innerHTML = '';
            this.options.expression[gender].forEach(expr => {
                const option = document.createElement('option');
                option.value = expr;
                option.textContent = expr;
                expressionSelect.appendChild(option);
            });
            expressionSelect.value = state.expression || this.options.expression[gender][0];
        }
    }

    async updatePreview(key, value) {
        console.log(`Updating preview for ${key}: ${value}`);
        const state = this.model.getState();
        this.renderer.clearLayers();

        const parts = [
            { part: 'body', zIndex: 0 },
            { part: 'ears', zIndex: 5 },
            { part: 'eyes', zIndex: 10 },
            { part: 'expression', zIndex: 15 }
        ];

        for (const { part, zIndex } of parts) {
            const path = this.assetLoader.getSpritePath(part, { ...state, animation: this.animation.currentAnimation });
            if (path) {
                try {
                    const sprite = await this.assetLoader.loadSprite(path);
                    this.renderer.addLayer(sprite, zIndex);
                } catch (error) {
                    console.error(`Error loading sprite for ${part}: ${error.message}`);
                }
            }
        }

        this.animation.setAnimation(this.animation.currentAnimation);
    }
}