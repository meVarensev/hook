# Описание

`cachedFetch` - это функция-декоратор, предназначенная для выполнения запросов к API с возможностью кэширования
результатов, чтобы избежать повторных запросов к одним и тем же URL-ам.

## Использование

```typescript
import axios, { AxiosResponse } from 'axios';

async function fetchData<T>(url: string): Promise<T> {
    try {
        console.log(`Fetching data for URL: ${url}`);
        const response: AxiosResponse<T> = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Request Error for URL: ${url}`, error);
        throw error;
    }
}

function cachingDecorator<T>(apiFunction: (url: string) => Promise<T>) {
    const cache = new Map<string, T>();

    return async function (url: string): Promise<T> {
        if (cache.has(url)) {
            console.log(`Cached response for URL: ${url}`);
            return cache.get(url) as T;
        }

        try {
            const response = await apiFunction(url);
            cache.set(url, response);
            return response;
        } catch (error) {
            console.error(`Request Error for URL: ${url}`, error);
            throw error;
        }
    };
}

const cachedFetch = cachingDecorator(fetchData);


async function makeApiRequests() {
    const url1 = "https://example.com/api/data/1";
    const url2 = "https://example.com/api/data/2";

    try {
        console.log(await cachedFetch<number>(url1)); // Запрос и кэширование для URL1
        console.log(await cachedFetch<number>(url1)); // Возвращение из кэша для URL1

        console.log(await cachedFetch<string>(url2)); // Запрос и кэширование для URL2
        console.log(await cachedFetch<string>(url2)); // Возвращение из кэша для URL2
    } catch (error) {
        console.error("General Error:", error);
    }
}

makeApiRequests();

```
 
## Пример использования `cachedFetch` 
можно найти в [этом codesandbox](https://codesandbox.io/s/quirky-shamir-kqcldj?file=/src/index.mjs:592-636).
 
## Идея для `cachedFetch` 
вдохновлена [статьей на learn.javascript](https://learn.javascript.ru/call-apply-decorators#prozrachnoe-keshirovanie).
 

## Параметры

- `url` (string): URL-адрес, по которому нужно выполнить запрос к API.

## Возвращаемое значение

Функция `cachedFetch` возвращает кэшированный результат запроса к API. Тип результата зависит от типа данных, указанного
при вызове `cachedFetch`.

## Обработка ошибок

Функция `cachedFetch` также обрабатывает ошибки запросов к API и выбрасывает их для дальнейшей обработки.
