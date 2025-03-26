function populateSelect(selectId, options) {
    const select = document.getElementById(selectId);
    select.innerHTML = '';
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.text = option;
        select.appendChild(opt);
    });
}

function updateHairStyles() {
    const gender = document.getElementById('gender').value;
    const hairStyleSelect = document.getElementById('hairStyle');
    hairStyleSelect.innerHTML = '';
    hairStyles[gender].forEach(style => {
        const option = document.createElement('option');
        option.value = style;
        option.text = style;
        hairStyleSelect.appendChild(option);
    });
    updatePreview();
}

function updateAnimations() {
    const gender = document.getElementById('gender').value;
    const animationSelect = document.getElementById('animation');
    animationSelect.innerHTML = '';
    animations[gender].forEach(anim => {
        const option = document.createElement('option');
        option.value = anim;
        option.text = anim.charAt(0).toUpperCase() + anim.slice(1);
        animationSelect.appendChild(option);
    });
    updateHairStyles();
    populateSelect('torso', torsoOptions[gender]);
    populateSelect('head', headOptions[gender]);
    populateSelect('face', faceOptions[gender]);
    populateSelect('neck', neckOptions[gender]);
    populateSelect('arms', armsOptions[gender]);
    populateSelect('hands', handsOptions[gender]);
    populateSelect('shoulders', shouldersOptions[gender]);
    populateSelect('waist', waistOptions[gender]);
    populateSelect('legs', legsOptions[gender]);
    populateSelect('feet', feetOptions[gender]);
    populateSelect('props', propsOptions[gender]);
    updateTorsoColorControls();
    updateHeadColorControls();
    updateFaceColorControls();
    updateNeckColorControls();
    updateArmsColorControls();
    updateHandsColorControls();
    updateShouldersColorControls();
    updateWaistColorControls();
    updateLegsColorControls();
    updateFeetColorControls();
    updatePropsColorControls();
    updateWeaponOptions();
    updatePreview();
}

// Универсальная функция для генерации кнопок цвета
function updateColorControls(part, options, currentColor) {
    const gender = document.getElementById('gender').value;
    const partValue = document.getElementById(part).value;
    const container = document.getElementById(`${part}-color-controls`);
    container.innerHTML = ''; // Очищаем контейнер

    const colors = options[gender][partValue] || [];

    if (colors.length === 0) {
        container.innerHTML = '<p>Нет доступных цветов</p>';
        window[currentColor] = null; // Сбрасываем текущий цвет
        return;
    }

    colors.forEach(color => {
        const btn = document.createElement('button');
        btn.className = 'torso-color-btn'; // Используем тот же класс для стилей
        btn.textContent = color;
        btn.onclick = () => {
            window[currentColor] = color;
            document.querySelectorAll(`#${part}-color-controls .torso-color-btn`).forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updatePreview();
        };
        if (color === window[currentColor]) {
            btn.classList.add('active');
        }
        container.appendChild(btn);
    });

    if (!window[currentColor] || !colors.includes(window[currentColor])) {
        window[currentColor] = colors[0];
        container.querySelector('.torso-color-btn').classList.add('active');
    }
}

// Функции для каждой части тела
function updateTorsoColorControls() {
    updateColorControls('torso', torsoColors, 'currentTorsoColor');
}

function updateHeadColorControls() {
    updateColorControls('head', headColors, 'currentHeadColor');
}

function updateFaceColorControls() {
    updateColorControls('face', faceColors, 'currentFaceColor');
}

function updateNeckColorControls() {
    updateColorControls('neck', neckColors, 'currentNeckColor');
}

function updateArmsColorControls() {
    updateColorControls('arms', armsColors, 'currentArmsColor');
}

function updateHandsColorControls() {
    updateColorControls('hands', handsColors, 'currentHandsColor');
}

function updateShouldersColorControls() {
    updateColorControls('shoulders', shouldersColors, 'currentShouldersColor');
}

function updateWaistColorControls() {
    updateColorControls('waist', waistColors, 'currentWaistColor');
}

function updateLegsColorControls() {
    updateColorControls('legs', legsColors, 'currentLegsColor');
}

function updateFeetColorControls() {
    updateColorControls('feet', feetColors, 'currentFeetColor');
}

function updatePropsColorControls() {
    updateColorControls('props', propsColors, 'currentPropsColor');
}

function updateWeaponOptions() {
    const gender = document.getElementById('gender').value;
    const animation = document.getElementById('animation').value;
    const weaponSelect = document.getElementById('weapon');
    weaponSelect.innerHTML = '';

    // Собираем все доступные оружия для пола
    const allWeapons = [
        ...new Set([
            ...weaponOptions[gender]['Shoot'],
            ...weaponOptions[gender]['Swing'],
            ...weaponOptions[gender]['Thrust']
        ])
    ]; // Убираем дубликаты с помощью Set

    allWeapons.forEach(weapon => {
        const option = document.createElement('option');
        option.value = weapon;
        option.text = weapon;
        weaponSelect.appendChild(option);
    });

    updatePreview();
}