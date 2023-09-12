## Описание

```typescript
import React, { useState, useCallback } from 'react';

type UseArrayActions<T> = {
    push: (item: T) => void;
    removeByIndex: (index: number) => void;
    removeById: (id: string) => void;
};

/**
 * Хук `useArray` предоставляет удобные функции для управления массивами в компонентах React.
 *
 * @param initialValue Начальное значение массива.
 * @returns Объект, содержащий текущее значение массива и функции для его изменения.
 */
export function useArray<T extends { id: string }>(initialValue: T[]): { value: T[] } & UseArrayActions<T> {
    const [value, setValue] = useState(initialValue);

    /**
     * Добавляет элемент в массив.
     *
     * @param item Элемент для добавления.
     */
    const push = useCallback((item: T) => {
        setValue(prev => [...prev, item]);
    }, []);

    /**
     * Удаляет элемент из массива по индексу.
     *
     * @param index Индекс элемента для удаления.
     */
    const removeByIndex = useCallback((index: number) => {
        setValue(prev => prev.filter((_, i) => i !== index));
    }, []);

    /**
     * Удаляет элемент из массива по ID.
     *
     * @param id ID элемента для удаления.
     */
    const removeById = useCallback((id: string) => {
        setValue(prev => prev.filter(item => item.id !== id));
    }, []);

    return { value, push, removeByIndex, removeById };
}
```

## Использование

Использование хука `useArray` остается без изменений, как описано в предыдущих ответах. Однако теперь предполагается, что каждый элемент массива имеет свойство `id`, по которому будет производиться удаление с использованием функции `removeById`.

```typescript
import React from 'react';
import { useArray } from './useArray';

interface Item {
    id: string;
    // Другие свойства элемента
}

const MyComponent: React.FC = () => {
    // Используем хук useArray
    const { value: items, push, removeByIndex, removeById } = useArray<Item>([
        { id: '1', /* Другие свойства */ },
        { id: '2', /* Другие свойства */ },
        // ...
    ]);

    return (
        <div>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.id}
                        <button onClick={() => removeById(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => push({ id: `${items.length + 1}`, /* Другие свойства */ })}>Add Item</button>
        </div>
    );
};

export default MyComponent;
```

Пожалуйста, убедитесь, что каждый элемент массива имеет уникальное свойство `id`, чтобы функция `removeById` могла корректно идентифицировать элемент для удаления.
