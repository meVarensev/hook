```typescript
import React, { useState, useCallback } from 'react';

type UseArrayActions<T> = {
    push: (item: T) => void;
    removeByIndex: (index: number) => void;
};

/**
 * Хук `useArray` предоставляет удобные функции для управления массивами в компонентах React.
 *
 * @param initialValue Начальное значение массива.
 * @returns Объект, содержащий текущее значение массива и функции для его изменения.
 */
export function useArray<T>(initialValue: T[]): { value: T[] } & UseArrayActions<T> {
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

    return { value, push, removeByIndex };
}
```

## Использование

Для использования хука `useArray`, вызовите его внутри вашего функционального компонента. Вот пример, как это можно сделать:

```typescript
import React from 'react';
import { useArray } from './useArray';

const MyComponent: React.FC = () => {
    // Используем хук useArray
    const { value: items, push, removeByIndex } = useArray<string>(['item 1', 'item 2', 'item 3']);

    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => removeByIndex(index)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => push(`item ${items.length + 1}`)}>Add Item</button>
        </div>
    );
};

export default MyComponent;
```

Этот код будет использовать  хук `useArray` для управления массивом элементов. 
