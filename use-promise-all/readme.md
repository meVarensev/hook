## Описание

```typescript
import {useState, useEffect} from 'react';

type PromiseResult<T> = [T[], Error | null];

const usePromiseAll = <T>(promises: Promise<T>[]): PromiseResult<T> => {
    const [result, setResult] = useState<PromiseResult<T>>([[], null]);

    useEffect(() => {
        let isMounted = true;

        const executePromises = async () => {
            try {
                const results = await Promise.all(promises);
                if (isMounted) {
                    setResult([results, null]);
                }
            } catch (error) {
                if (isMounted) {
                    setResult([[], error]);
                }
            }
        };

        executePromises();

        return () => {
            isMounted = false;
        };
    }, [promises]);

    return result;
};

export {usePromiseAll};

```

Этот модуль предоставляет хук `usePromiseAll`, который позволяет выполнять несколько асинхронных операций параллельно и получать результаты и ошибки их выполнения.

Хук `usePromiseAll` принимает один аргумент:

1. `promises` - массив промисов, которые необходимо выполнить.

При первом вызове хук `usePromiseAll` он устанавливает начальное состояние `result` в массив с пустым списком результатов и значением ошибки `null`. Затем хук создает эффект с использованием `useEffect`, который запускается при изменении массива `promises`. Внутри этого эффекта выполняется функция `executePromises`, которая использует `Promise.all` для выполнения всех промисов из массива `promises`. Если все промисы успешно выполняются, `executePromises` обновляет состояние `result` с массивом результатов и значением ошибки `null`. В случае, если хотя бы один промис отклонен, `executePromises` обновляет состояние `result` с пустым списком результатов и объектом ошибки, содержащим информацию об отклоненном промисе.

Таким образом, после завершения выполнения всех промисов из массива `promises`, хук `usePromiseAll` возвращает массив с результатами и ошибкой выполнения промисов.

## Использование

Для использования хука `usePromiseAll`, просто вызовите его внутри функционального компонента. Вот пример, как это можно сделать:

```typescript
import React, { useEffect } from 'react';
import usePromiseAll from './usePromiseAll';

const MyComponent: React.FC = () => {
  const fetchData = () => {
    return new Promise((resolve) => {
      // Вместо setTimeout здесь может быть, например, запрос к серверу с fetch или axios
      setTimeout(() => {
        resolve({ name: 'John', age: 30 });
      }, 1000);
    });
  };

  const fetchPosts = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]);
      }, 1500);  
    });
  };

  const [results, error] = usePromiseAll<any>([fetchData(), fetchPosts()]);

  useEffect(() => {
    if (error) {
      console.error('Произошла ошибка:', error);
    } else {
      console.log('Результаты промисов:', results);
    }
  }, [results, error]);

  return (
    <div>
      {/* Ваш JSX-код здесь */}
    </div>
  );
};

export {MyComponent};
```

В этом примере компонента `MyComponent` мы используем хук `usePromiseAll` для выполнения двух асинхронных операций (`fetchData` и `fetchPosts`) параллельно. После завершения обеих операций, хук `usePromiseAll` возвращает массив с результатами (`results`) и ошибкой выполнения промисов (`error`). Мы используем `useEffect` для вывода результатов или ошибки в консоль после завершения операций.

Пожалуйста, замените примеры `fetchData` и `fetchPosts` на реальные асинхронные операции, такие как запросы к серверу с помощью `fetch` или `axios`.
