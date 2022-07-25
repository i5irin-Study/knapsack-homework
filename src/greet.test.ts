import makeGreet from './greet';

describe('greet', () => {
  it.each([
    ['', 'Hello !!'],
    ['i5irin', 'Hello i5irin!!'],
  ])('should be able to combine "Hello" with a name', (name, greet) => {
    expect.assertions(1);
    expect(makeGreet(name)).toBe(greet);
  });
});
