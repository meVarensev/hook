import { classNames } from '../class-names';

test.concurrent.each([
    ['base-class', {}, [], 'base-class'],
    ['base-class', { active: true, large: true, disabled: false }, ['extra-class', 'more-classes'], 'base-class extra-class more-classes active large'],
    ['base-class', { active: true, large: false, disabled: true }, [], 'base-class active disabled'],
    ['base-class', { active: true, large: undefined, disabled: true }, [], 'base-class active disabled'],
])('classNames function should behave correctly with different inputs', async (cls, mods, additional, expected) => {
    const result = classNames(cls, mods, additional);

    expect(result).toBe(expected);
});
