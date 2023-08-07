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
