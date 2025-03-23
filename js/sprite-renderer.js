export class SpriteRenderer {
    constructor(previewCanvas, spritesheetCanvas) {
        this.previewCtx = previewCanvas.getContext('2d');
        this.spritesheetCtx = spritesheetCanvas.getContext('2d');
        this.spritesheetCanvas = spritesheetCanvas; // Сохраняем сам элемент canvas
        this.previewCtx.imageSmoothingEnabled = false;
        this.spritesheetCtx.imageSmoothingEnabled = false;
        this.layers = [];
    }

    addLayer(image, zIndex) {
        this.layers.push({ image, zIndex });
        this.layers.sort((a, b) => a.zIndex - b.zIndex);
    }

    clearLayers() {
        this.layers = [];
    }

    renderPreview(frame, direction) {
        this.previewCtx.clearRect(0, 0, 128, 128);
        const x = 32, y = 32;
        
        this.layers.forEach(layer => {
            if (layer.image) {
                this.previewCtx.drawImage(
                    layer.image,
                    frame * 64, direction * 64, 64, 64,
                    x, y, 64, 64
                );
            }
        });
    }

    renderSpritesheet(frames, directions) {
        this.spritesheetCtx.clearRect(0, 0, 512, 256);
        
        for (let dir = 0; dir < directions; dir++) {
            for (let frame = 0; frame < frames; frame++) {
                this.layers.forEach(layer => {
                    if (layer.image) {
                        this.spritesheetCtx.drawImage(
                            layer.image,
                            frame * 64, dir * 64, 64, 64,
                            frame * 64, dir * 64, 64, 64
                        );
                    }
                });
            }
        }
    }

    exportSpritesheet() {
        return this.spritesheetCanvas.toDataURL('image/png');
    }
}
