## Описание
```typescript
import { useState } from 'react';

type ToggleState = boolean;
type ToggleActions = {
    toggle: () => void;
    setTrue: () => void;
    setFalse: () => void;
};

const useToggle = (initialState: ToggleState = false): [ToggleState, ToggleActions] => {
    const [state, setState] = useState<ToggleState>(initialState);

    const toggle = () => {
        setState((prevState) => !prevState);
    };

    const setTrue = () => {
        setState(true);
    };

    const setFalse = () => {
        setState(false);
    };

    return [state, { toggle, setTrue, setFalse }];
};

export {useToggle};
```

Этот модуль предоставляет хук `useToggle`, который позволяет управлять булевым состоянием компонента и предоставляет функции для его изменения.

Хук `useToggle` принимает один аргумент:

1. `initialState` (опционально) - начальное значение состояния (по умолчанию `false`).

При первом вызове хук `useToggle` устанавливает начальное состояние переданным `initialState` или значением `false`, если `initialState` не был предоставлен. Затем хук возвращает текущее состояние `isToggled` и объект `toggleActions`, содержащий три функции:

- `toggle` - переключает значение состояния между `true` и `false`.
- `setTrue` - устанавливает состояние в `true`.
- `setFalse` - устанавливает состояние в `false`.

Таким образом, хук `useToggle` предоставляет удобный способ управления булевым состоянием компонента и легко переключать его между `true` и `false` при необходимости.

## Использование

Для использования хука `useToggle`, просто вызовите его внутри функционального компонента. Вот пример, как это можно сделать:

```typescript
import React from 'react';
import useToggle from './useToggle';

const MyComponent: React.FC = () => {
  // Используем хук useToggle
  const [isToggled, toggleActions] = useToggle(false);

  return (
    <div>
      <button onClick={toggleActions.toggle}>Toggle</button>
      <button onClick={toggleActions.setTrue}>Set True</button>
      <button onClick={toggleActions.setFalse}>Set False</button>
      <p>{isToggled ? 'Toggled On' : 'Toggled Off'}</p>
    </div>
  );
};

export default MyComponent;
```

В этом примере компонента `MyComponent` мы используем хук `useToggle`, чтобы добавить три кнопки, которые позволяют переключать состояние `isToggled` между `true` и `false`, а также установить его в явно заданное значение `true` или `false`.

Пожалуйста, замените примеры кнопок на свою функциональность в зависимости от вашего приложения. Теперь вы можете легко использовать этот хук в своих компонентах для управления булевыми состояниями и логики, связанной с ними.
