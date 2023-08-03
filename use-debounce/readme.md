# Описание

```typescript
import {useState, useEffect} from 'react';

const useDebounce = <T>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export {useDebounce}
```

## Этот модуль предоставляет hook `useDebounce`, который позволяет создавать задержку для значения и возвращать его с отложенным обновлением.

hook `useDebounce` принимает два аргумента:

1. `value` - значение, для которого необходимо создать задержку.
2. `delay` - задержка (в миллисекундах), определяющая, через какое время обновится возвращаемое значение.

При первом вызове hook `useDebounce` он устанавливает состояние `debouncedValue` в переданное начальное
значение `value`. Затем хук создает эффект с использованием `useEffect`, который запускается при изменении `value`
или `delay`. Внутри этого эффекта устанавливается таймер с помощью `setTimeout`, который вызывает обновление
состояния `debouncedValue` через указанный `delay`. Если значение `value` или `delay` изменяется до завершения таймера,
предыдущий таймер очищается с помощью `clearTimeout`, и новый таймер устанавливается.

Таким образом, значение `debouncedValue` обновляется только после того, как `value` остается неизменным в течение
указанного периода `delay`. Это позволяет использовать хук `useDebounce`, чтобы уменьшить частоту обновлений при
изменении значения, что может быть полезно, например, при обработке пользовательского ввода в поисковой строке или
фильтрации данных.

## Использование

Для использования hook `useDebounce` с библиотекой `axios` для выполнения HTTP-запросов, просто воспользуйтесь им внутри
эффекта `useEffect`. Вот пример, как это можно сделать:

```typescript
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useDebounce} from './useDebounce';  

const MyComponent: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const debounceDelay = 500;  

   
    const debouncedInputValue = useDebounce(inputValue, debounceDelay);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(
                    `https://jsonplaceholder.typicode.com/comments?name=${debouncedInputValue}`
                );
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchSearchResults();
    }, [debouncedInputValue]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
    };

    return (
        <div>
            <input
                type = "text"
                value = {inputValue}
                onChange = {handleInputChange}
                placeholder = "Search..."
        />

            <ul>
                {
                    searchResults.map((result) => (
                        <li key = {result.id} > {result.name} </li>
                    ))
                }
            </ul>
        < /div>
)
    ;
};

export default MyComponent;
```

В приведенном примере компонента `MyComponent` мы используем хук `useDebounce` для задержки обновления
значения `inputValue`, и при каждом изменении задержанного значения (`debouncedInputValue`), мы отправляем запрос с
помощью `axios.get()`. В результате запроса мы обновляем состояние `searchResults` с полученными данными.

Помните, что в этом примере используется API https://jsonplaceholder.typicode.com, предоставляющее тестовые данные для
демонстрации. В реальном приложении замените его на реальное API для выполнения соответствующих запросов.
