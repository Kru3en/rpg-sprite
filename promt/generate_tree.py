import os

def generate_directory_tree(start_path='.', output_file='directory_tree.md'):
    """
    Генерирует структуру директорий и файлов в формате Markdown.
    
    Args:
        start_path (str): Начальный путь для сканирования (по умолчанию текущая директория)
        output_file (str): Имя выходного Markdown файла
    """
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('# Структура директорий\n\n')
        f.write('```\n')
        
        # Проходим по директориям и файлам
        for root, dirs, files in os.walk(start_path):
            # Вычисляем уровень вложенности
            level = root.replace(start_path, '').count(os.sep)
            indent = '  ' * level
            
            # Записываем текущую директорию
            dir_name = os.path.basename(root) if root != start_path else start_path
            if dir_name:  # Пропускаем корневую точку в начале
                f.write(f'{indent}- {dir_name}/\n')
            
            # Записываем файлы в текущей директории
            for file in sorted(files):
                f.write(f'{indent}  - {file}\n')
                
        f.write('```\n')

def main():
    # Можно указать конкретный путь или использовать текущую директорию
    path = input("Введите путь для сканирования (Enter для текущей директории): ") or '.'
    
    try:
        generate_directory_tree(path)
        print(f"Структура директорий успешно сохранена в 'directory_tree.md'")
    except Exception as e:
        print(f"Произошла ошибка: {str(e)}")

if __name__ == "__main__":
    main()