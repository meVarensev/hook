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
