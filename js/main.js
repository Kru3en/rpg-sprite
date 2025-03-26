// Инициализация приложения
populateSelect('hairColor', hairColors);
populateSelect('eyes', eyeColors);
updateAnimations();

// Добавление обработчиков событий
document.querySelectorAll('select').forEach(select => {
    if (select.id === 'animation') {
        select.addEventListener('change', () => {
            updateWeaponOptions(); // Обновляем оружие при смене анимации
            updatePreview();
        });
    } else if (select.id !== 'gender') {
        select.addEventListener('change', updatePreview);
    }
});

// Начальный рендеринг
updatePreview();