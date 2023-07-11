# Описание

```typescript
type Mods = Record<string, boolean | string>;

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
import React from 'react';
import { classNames } from './classNames';

interface ButtonProps {
  className?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  isActive = "",
  isDisabled ,
  size = 'medium',
  children,
}) => {
  const baseClass = 'button';
  const modifiers = {
    active: isActive,
    [size]: true,
  };

  const buttonClasses = classNames(baseClass, modifiers, [className]);

  return (
    <button className={buttonClasses} disabled={isDisabled}>
      {children}
    </button>
  );
};

export default Button;
```

В этом примере компонент Button принимает несколько пропсов, включая className, isActive, isDisabled и size. Он использует функцию classNames для создания строки с классами CSS для кнопки.

Когда компонент рендерится, он применяет базовый класс 'button', а также добавляет модификаторы в зависимости от переданных пропсов. Если пропс isActive равен true, добавляется модификатор 'active'. Если пропс isDisabled равен true, добавляется модификатор 'disabled'. И, наконец, используется значение пропса size в качестве имени модификатора (например, 'small', 'medium' или 'large').

Строка с классами затем применяется к кнопке с помощью атрибута className. Если пропс isDisabled равен true, кнопка будет отключена.

Таким образом, при использовании компонента Button можно передать классы, задать активное/неактивное состояние и определить размер кнопки, в зависимости от переданных пропсов.

## Предположим, что вы использовали компонент Button следующим образом:

```javascript
<Button className="custom-button" isActive={true} isDisabled={false} size="large">
  Click me
</Button>
```
## Результатом будет следующий HTML-код:
```html
<button class="button active large custom-button">Click me</button>
```
