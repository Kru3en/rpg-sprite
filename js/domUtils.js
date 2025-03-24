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
    updateTorsoColorControls(); // Добавляем вызов для генерации кнопок
    updatePreview();
}

function updateTorsoColorControls() {
    const gender = document.getElementById('gender').value;
    const torso = document.getElementById('torso').value;
    const container = document.getElementById('torso-color-controls');
    container.innerHTML = ''; // Очищаем контейнер

    const colors = torsoColors[gender][torso] || [];

    if (colors.length === 0) {
        // Если цветов нет, показываем сообщение или скрываем контейнер
        container.innerHTML = '<p>Нет доступных цветов</p>';
        currentTorsoColor = null; // Сбрасываем текущий цвет
        return;
    }

    // Создаём кнопки для каждого цвета
    colors.forEach(color => {
        const btn = document.createElement('button');
        btn.className = 'torso-color-btn';
        btn.textContent = color;
        btn.onclick = () => {
            currentTorsoColor = color;
            // Убираем активный класс у всех кнопок
            document.querySelectorAll('.torso-color-btn').forEach(b => b.classList.remove('active'));
            // Добавляем активный класс к нажатой кнопке
            btn.classList.add('active');
            updatePreview();
        };
        // Если цвет текущий, делаем кнопку активной
        if (color === currentTorsoColor) {
            btn.classList.add('active');
        }
        container.appendChild(btn);
    });

    // Если currentTorsoColor не задан или не в списке, выбираем первый цвет
    if (!currentTorsoColor || !colors.includes(currentTorsoColor)) {
        currentTorsoColor = colors[0];
        container.querySelector('.torso-color-btn').classList.add('active');
    }
}