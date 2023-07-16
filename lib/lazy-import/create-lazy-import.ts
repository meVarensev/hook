import {lazy, LazyExoticComponent} from "react";

type LazyImport<T> = () => Promise<{ default: T }>;

export function createLazyImport<T>(
    importFunc: LazyImport<T>,
    exportName: string
): LazyExoticComponent<T> {
    const lazyImport: LazyImport<T> = async () => {
        const module = await importFunc();
        return {default: module[exportName]};
    };

    return lazy(lazyImport);
}
