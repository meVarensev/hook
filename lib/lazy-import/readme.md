# Описание

```typescript
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
```

Модуль предоставляет функцию createLazyImport, которая помогает создавать ленивые (lazy) импорты компонентов в React. Ленивая загрузка компонентов позволяет отложить загрузку кода компонента до момента, когда он действительно понадобится, что может улучшить производительность приложения.

### Функция createLazyImport принимает два аргумента:

* importFunc: Функция импорта, которая должна возвращать промис с экспортируемым модулем компонента. Эта функция может быть создана с помощью () => import('path/to/module'), где 'path/to/module' - это путь к модулю компонента, который вы хотите лениво загрузить.

* exportName: Имя экспорта компонента, который вы хотите использовать в лениво загружаемом компоненте.

Функция createLazyImport возвращает ленивый (lazy) компонент, который можно использовать в приложении. Ленивый компонент будет динамически загружать указанный модуль компонента и использовать указанный экспорт.

### Пример использования:

```typescript
const importComponent = () => import('./Component');
const LazyComponent = createLazyImport(importComponent, 'Component');
```

В этом примере мы создаем функцию importComponent, которая импортирует модуль компонента './Component'. Затем мы используем функцию createLazyImport для создания ленивого компонента LazyComponent, который будет загружать и использовать экспорт с именем 'Component'.
