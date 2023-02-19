import { findIndexById } from './common-helpers';

describe('find by id in array of objects test', () => {
  const foo = {
    id: '1234',
    name: 'foo',
  };

  const bar = {
    id: '8976',
    name: 'bar',
  };

  const baz = {
    id: '7583',
    name: 'baz',
  };

  const array = [foo, bar, baz];

  test('should find', () => {
    expect(findIndexById(array, 'id', '7583')).toBe(2);
  });

  test('will not find and should return null', () => {
    expect(findIndexById(array, 'id', 'lakdsjfas')).toBe(null);
  });

  test('when empty array, should return null', () => {
    expect(findIndexById([], 'property', '12345')).toBe(null);
  });
});
