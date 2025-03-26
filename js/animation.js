let currentFrame = 0;
let animationInterval = null;

function updatePreview() {
    if (animationInterval) clearInterval(animationInterval);

    const gender = document.getElementById('gender').value;
    const skin = document.getElementById('skin').value;
    const hairStyle = document.getElementById('hairStyle').value;
    const hairColor = document.getElementById('hairColor').value;
    const eyes = document.getElementById('eyes').value;
    const torso = document.getElementById('torso').value;
    const head = document.getElementById('head').value;
    const face = document.getElementById('face').value;
    const neck = document.getElementById('neck').value;
    const arms = document.getElementById('arms').value;
    const hands = document.getElementById('hands').value;
    const shoulders = document.getElementById('shoulders').value;
    const waist = document.getElementById('waist').value;
    const legs = document.getElementById('legs').value;
    const feet = document.getElementById('feet').value;
    const props = document.getElementById('props').value;
    const weapon = document.getElementById('weapon').value;
    const animation = document.getElementById('animation').value;

    directions.forEach(direction => {
        const dirContainer = document.getElementById(`dir-${direction}`);
        dirContainer.innerHTML = '';
    });

    const weaponInfo = getWeaponPath(gender, weapon, animation);
    console.log('Weapon:', weapon, 'WeaponInfo:', weaponInfo);

    let weaponFrameWidth = frameWidth;
    let weaponFrameHeight = frameHeight;
    let weaponCols = 8;
    if (weaponInfo && weaponInfo.sizeInfo) {
        weaponCols = weaponInfo.sizeInfo.cols;
        weaponFrameWidth = weaponInfo.sizeInfo.width / weaponCols;
        weaponFrameHeight = weaponInfo.sizeInfo.height / 4;
        console.log('Weapon frame size:', weaponFrameWidth, 'x', weaponFrameHeight);
    }

    const layers = [
        { src: `${basePath}Body/Base/${gender}/${skin}/${animation}.png`, class: 'body', condition: true },
        { src: `${basePath}Body/Eyes/${gender}/${eyes}/${animation}.png`, class: 'eyes', condition: true },
        { src: getLegsPath(gender, legs, animation), class: 'legs', condition: legs !== 'None' },
        { src: getFeetPath(gender, feet, animation), class: 'feet', condition: feet !== 'None' },
        { src: getTorsoPath(gender, torso, animation), class: 'torso', condition: torso !== 'None' },
        { src: getArmsPath(gender, arms, animation), class: 'arms', condition: arms !== 'None' },
        { src: getHandsPath(gender, hands, animation), class: 'hands', condition: hands !== 'None' },
        { src: getShouldersPath(gender, shoulders, animation), class: 'shoulders', condition: shoulders !== 'None' },
        { src: getWaistPath(gender, waist, animation), class: 'waist', condition: waist !== 'None' },
        { src: getNeckPath(gender, neck, animation), class: 'neck', condition: neck !== 'None' },
        { src: `${basePath}Body/Hair/${gender}/${hairStyle}/${hairColor}${hairStyle === 'Extra Long' ? '/Front' : ''}/${animation}.png`, class: 'hair', condition: true },
        { src: getHeadPath(gender, head, animation), class: 'head', condition: head !== 'None' },
        { src: getFacePath(gender, face, animation), class: 'face', condition: face !== 'None' },
        { src: getPropsPath(gender, props, animation), class: 'props', condition: props !== 'None' },
        { src: weaponInfo ? weaponInfo.path : null, class: 'weapon', condition: weapon !== 'None' && weaponInfo }
    ];

    directions.forEach(direction => {
        const dirContainer = document.getElementById(`dir-${direction}`);
        layers.forEach(layer => {
            if (layer.condition) {
                const img = document.createElement('img');
                img.src = layer.src;
                img.className = layer.class;
                img.style.objectFit = 'none';
                img.style.imageRendering = 'pixelated';
                
                if (layer.class === 'weapon') {
                    img.style.width = `${weaponFrameWidth}px`;
                    img.style.height = `${weaponFrameHeight}px`;
                    // Центрируем оружие относительно 64x64 персонажа
                    img.style.left = `${(64 - weaponFrameWidth) / 2}px`;
                    img.style.top = `${(64 - weaponFrameHeight) / 2}px`;
                    img.onerror = () => console.error(`Failed to load weapon image: ${layer.src}`);
                    console.log(`Adding weapon image: ${layer.src}, size: ${weaponFrameWidth}x${weaponFrameHeight}`);
                } else {
                    img.style.width = `${frameWidth}px`;
                    img.style.height = `${frameHeight}px`;
                }
                dirContainer.appendChild(img);
            }
        });
    });

    currentFrame = 0;
    const totalFrames = Math.min(weaponCols, frameCounts[animation] || 1);

    animationInterval = setInterval(() => {
        directions.forEach(direction => {
            const dirContainer = document.getElementById(`dir-${direction}`);
            const imgs = dirContainer.querySelectorAll('img');
            const yOffset = -(directionRows[direction] * frameHeight);
            const weaponYOffset = -(directionRows[direction] * weaponFrameHeight);
            const xOffset = -(currentFrame * frameWidth);
            if (animation === 'idle') {
                imgs.forEach(img => {
                    if (img.className === 'body') {
                        // Скин: переключаем между 2 кадрами
                        const xOffset = -(currentFrame % 2) * frameWidth; // 0 или -64
                        img.style.objectPosition = `${xOffset}px ${yOffset}px`;
                        img.style.transform = 'none';
                    } else if (img.className === 'weapon') {
                        // Оружие: статичная позиция
                        img.style.objectPosition = `0px ${weaponYOffset}px`;
                        const shift = (currentFrame % 2 !== 0) ? -0.3 : 0.1; // -1px вверх, 1px вниз
                        img.style.transform = `translateY(${shift}px)`;
                        img.style.transformOrigin = 'center center';
                
                    } else {
        
                        img.style.objectPosition = `0px ${yOffset}px`;
                        const shift = (currentFrame % 2 !== 0) ? -0.3 : 0.1; // -1px вверх, 1px вниз
                        img.style.transform = `translateY(${shift}px)`;
                        img.style.transformOrigin = 'center center';
                    }
                });
            } else {
                const weaponXOffset = -(currentFrame * weaponFrameWidth);
                imgs.forEach(img => {
                    if (img.className === 'weapon') {
                        img.style.objectPosition = `${weaponXOffset}px ${weaponYOffset}px`;
                        console.log(`Weapon offset (${direction}): ${weaponXOffset}px ${weaponYOffset}px`);
                    } else {
                        img.style.objectPosition = `${xOffset}px ${yOffset}px`;
                    }
                    img.style.transform = 'rotate(0deg)';
                    img.style.transformOrigin = 'center center';
                });
            }
        });
        currentFrame = (currentFrame + 1) % totalFrames;
    }, animationSpeed);
}