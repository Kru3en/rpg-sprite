export class CharacterModel {
    constructor() {
        this.state = {
            gender: 'male',
            bodyType: 'normal',
            skinColor: 'Ivory',
            earStyle: 'none',
            eyeColor: 'Brown',
            expression: 'none',
            hairStyle: 'none',
            hairColor: 'black',
            facialHair: 'none',
            torso: 'none',
            legs: 'none',
            feet: 'none',
            weaponType: 'none',
            weapon: 'none'
        };
        this.listeners = [];
    }

    setProperty(key, value) {
        if (this.state[key] !== value) {
            this.state[key] = value;
            this.notifyListeners(key, value);
        }
    }

    getState() {
        return { ...this.state };
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    notifyListeners(key, value) {
        this.listeners.forEach(listener => listener(key, value));
    }

    exportConfig() {
        return JSON.stringify(this.state, null, 2);
    }
}
