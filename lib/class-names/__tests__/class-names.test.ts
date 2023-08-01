import { classNames } from '../class-names';

test('classNames function should return the base class when no mods and additional classes are provided', () => {
    const cls = 'base-class';
    const mods = {};
    const additional = [];

    const result = classNames(cls, mods, additional);

    expect(result).toBe('base-class');
});

test('classNames function should combine base class, additional classes, and truthy mods', () => {
    const cls = 'base-class';
    const mods = {
        active: true,
        large: true,
        disabled: false,
    };
    const additional = ['extra-class', 'more-classes'];

    const result = classNames(cls, mods, additional);

    expect(result).toBe('base-class extra-class more-classes active large');
});

test('classNames function should ignore falsy mods', () => {
    const cls = 'base-class';
    const mods = {
        active: true,
        large: false,
        disabled: true,
    };
    const additional = [];

    const result = classNames(cls, mods, additional);

    expect(result).toBe('base-class active disabled');
});

test('classNames function should ignore undefined mods', () => {
    const cls = 'base-class';
    const mods = {
        active: true,
        large: undefined,
        disabled: true,
    };
    const additional = [];

    const result = classNames(cls, mods, additional);

    expect(result).toBe('base-class active disabled');
});
