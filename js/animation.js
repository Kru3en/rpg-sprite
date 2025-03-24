let currentFrame = 0;
let animationInterval = null;

function updatePreview() {
    if (animationInterval) {
        clearInterval(animationInterval);
    }

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
    const animation = document.getElementById('animation').value;

    directions.forEach(direction => {
        const dirContainer = document.getElementById(`dir-${direction}`);
        dirContainer.innerHTML = '';
    });

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
        { src: getPropsPath(gender, props, animation), class: 'props', condition: props !== 'None' }
    ];

    directions.forEach(direction => {
        const dirContainer = document.getElementById(`dir-${direction}`);
        layers.forEach(layer => {
            if (layer.condition) {
                const img = document.createElement('img');
                img.src = layer.src;
                img.className = layer.class;
                img.style.objectFit = 'none';
                img.style.width = `${frameWidth}px`;
                img.style.height = `${frameHeight}px`;
                dirContainer.appendChild(img);
            }
        });
    });

    currentFrame = 0;
    const totalFrames = frameCounts[animation] || 1;

    animationInterval = setInterval(() => {
        directions.forEach(direction => {
            const dirContainer = document.getElementById(`dir-${direction}`);
            const imgs = dirContainer.querySelectorAll('img');
            const yOffset = -(directionRows[direction] * frameHeight);

            if (animation === 'idle') {
                const tiltFactor = Math.sin(currentFrame * 0.1) * 5;
                const flipDirection = tiltFactor >= 0 ? 1 : -1;
                imgs.forEach(img => {
                    img.style.imageRendering = 'pixelated';
                    img.style.transform = `rotate(${tiltFactor}deg) scaleX(${flipDirection})`;
                    img.style.transformOrigin = 'center bottom';
                    img.style.objectPosition = `0px ${yOffset}px`;
                });
            } else {
                const xOffset = -(currentFrame * frameWidth);
                imgs.forEach(img => {
                    img.style.objectPosition = `${xOffset}px ${yOffset}px`;
                    img.style.transform = 'rotate(0deg)';
                    img.style.transformOrigin = 'center center';
                });
            }
        });
        currentFrame = (currentFrame + 1) % totalFrames;
    }, animationSpeed);
}