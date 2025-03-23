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
    updatePreview();
}