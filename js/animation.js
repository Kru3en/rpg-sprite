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
    const animation = document.getElementById('animation').value;

    directions.forEach(direction => {
        const dirContainer = document.getElementById(`dir-${direction}`);
        dirContainer.innerHTML = '';
    });

    const layers = [
        { src: `${basePath}Body/Base/${gender}/${skin}/${animation}.png`, class: 'body' },
        { src: `${basePath}Body/Hair/${gender}/${hairStyle}/${hairColor}${hairStyle === 'Extra Long' ? '/Front' : ''}/${animation}.png`, class: 'hair' },
        { src: `${basePath}Body/Eyes/${gender}/${eyes}/${animation}.png`, class: 'eyes' },
        { src: getTorsoPath(gender, torso, hairColor, animation), class: 'torso' }
    ];

    directions.forEach(direction => {
        const dirContainer = document.getElementById(`dir-${direction}`);
        layers.forEach(layer => {
            const img = document.createElement('img');
            img.src = layer.src;
            img.className = layer.class;
            img.style.objectFit = 'none'; // Prevent scaling artifacts
            img.style.width = `${frameWidth}px`; // Lock to sprite size
            img.style.height = `${frameHeight}px`;
            dirContainer.appendChild(img);
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
                const tiltFactor = Math.sin(currentFrame * 0.1) * 5; // Амплитуда наклона ±5 градусов
                const flipDirection = tiltFactor >= 0 ? 1 : -1; // Strictly 1 or -1 for proper mirroring
                imgs.forEach(img => {
                    img.style.imageRendering = 'pixelated';
                    img.style.transform = `rotate(${tiltFactor}deg) scaleX(${flipDirection})`; // Proper flip
                    img.style.transformOrigin = 'center bottom';
                    img.style.objectPosition = `0px ${yOffset}px`;
                });
            } else {
                // Normal sprite sheet animation
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