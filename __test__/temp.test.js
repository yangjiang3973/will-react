import react from '../src/react.js'

test('Vnode structure', () => {
  expect(react.createElement('div', null, null)).toEqual({ 'type':'div', 'props':{'children': [null]}, 'key':null, 'ref': null });
});
