# Описание

```typescript
export type Mods = Record<string, boolean | string>;

export const classNames = (
    cls: string,
    mods: Mods,
    additional: string[]
): string =>
    [
        cls,
        ...additional.filter(Boolean),
        ...Object.keys(mods).filter((key) => mods[key])
    ].join(' ');
```

Этот модуль предоставляет функцию classNames, которая помогает создавать строку с классами CSS на основе заданных параметров. Она принимает имя базового класса, объект с модификаторами и дополнительный массив классов и возвращает строку с классами, разделенными пробелами.

## Использование

```typescript
// my_button.tsx
import React from 'react';
import {classNames, Mods} from './classNames';
import styles from './Button.module.css';

interface ButtonProps {
    className?: string;
    isDisabled?: boolean;
    mods?: ExtendedMods;
    additional?: string[];
    onClick?: () => void;
    children: React.ReactNode;
}

interface ExtendedMods extends Mods {
    primary?: boolean;
    secondary?: boolean;
    small?: boolean;
    medium?: boolean;
    large?: boolean;
}

const Button: React.FC<ButtonProps> = ({
                                           mods = {},
                                           additional = [],
                                           onClick,
                                           children,
                                           isDisabled
                                       }) => {
    const ExtendedMods = {
        [styles.primary]: mods.primary,
        [styles.secondary]: mods.secondary,
        [styles.small]: mods.small,
        [styles.medium]: mods.medium,
        [styles.large]: mods.large,
    }
    const buttonClassNames = classNames(styles.button, ExtendedMods , additional);

    return (
        <button className={buttonClassNames} onClick={onClick} disabled={isDisabled}>
            {children}
        </button>
    );
};

export default Button;
```
```css
/* Button.module.css */

.button {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
}

.primary {
    background-color: #007bff;
    color: #fff;
}

.secondary {
    background-color: #6c757d;
    color: #fff;
}

.large {
    padding: 30px 60px;
    font-size: 18px;
}


.medium{
    padding: 15px 30px;
    font-size: 16px;
}
.small {
    padding: 5px 10px;
    font-size: 12px;
}


.additional-class {
    /* Ваши дополнительные стили */
}

.button:hover {
    opacity: 0.8;
}

```

```typescript
import Button from "./my_button.tsx"

function App() {

    return (
        <div>
            <Button mods={{primary: true}} onClick={() => console.log('Button clicked')}>
                Primary Button
            </Button>

            <Button
                mods={{secondary: true, medium: true}}
                additional={['custom-button']}
                onClick={() => console.log('Button clicked')}
                isDisabled={true}
            >
                Secondary Large Button
            </Button>
        </div>
    )
}

export default App
```


## Предположим, что вы использовали компонент Button следующим образом:

```javascript
 <Button mods={{primary: true}} onClick={() => console.log('Button clicked')}>
                Primary Button
 </Button>
```
## Результатом будет следующий HTML-код:
```html
<button class="_button_uu9hq_5 _primary_uu9hq_23">Primary Button</button>
```
