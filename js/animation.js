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
            const xOffset = -(currentFrame * frameWidth);
            imgs.forEach(img => {
                img.style.objectPosition = `${xOffset}px ${yOffset}px`;
            });
        });
        currentFrame = (currentFrame + 1) % totalFrames;
    }, animationSpeed);
}