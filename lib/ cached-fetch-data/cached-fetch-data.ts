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

export const cachedFetch = cachingDecorator(fetchData);
