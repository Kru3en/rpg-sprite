// Модель персонажа
export class CharacterModel {
    constructor() {
        this.state = {
            gender: 'Human_female',
            skin: 'Coffee',
            hairStyle: 'Afro',
            hairColor: 'Black',
            eyes: 'Blue',
            torso: 'Blouse',
            head: 'None',
            face: 'None',
            neck: 'None',
            arms: 'None',
            hands: 'None',
            shoulders: 'None',
            waist: 'None',
            legs: 'None',
            feet: 'None',
            props: 'None',
            weapon: 'None',
            animation: 'idle',
            colors: {
                torso: null,
                head: null,
                face: null,
                neck: null,
                arms: null,
                hands: null,
                shoulders: null,
                waist: null,
                legs: null,
                feet: null,
                props: null
            }
        };
    }

    updateState(key, value) {
        try {
            if (key in this.state) {
                this.state[key] = value;
            } else if (key in this.state.colors) {
                this.state.colors[key] = value;
            } else {
                throw new Error(`Недопустимый ключ состояния: ${key}`);
            }
        } catch (error) {
            console.error(`Ошибка обновления состояния: ${error.message}`);
        }
    }

    getState() {
        return { ...this.state };
    }
}