// Инициализация приложения
populateSelect('hairColor', hairColors);
populateSelect('eyes', eyeColors);
updateAnimations();

// Добавление обработчиков событий
document.querySelectorAll('select').forEach(select => {
    if (select.id !== 'gender' && select.id !== 'animation') {
        select.addEventListener('change', updatePreview);
    }
});

// Начальный рендеринг
updatePreview();