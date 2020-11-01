const { getLonguestDuplicates } = require('./removeDuplicates')

test('empty array when length === 0', () => {
  expect(getLonguestDuplicates([])).toEqual([])
})

test('array with length === 1 to return empty array', () => {
  expect(getLonguestDuplicates(['onlyOne'])).toEqual([])
})

test('remove shortest string', () => {
  expect(getLonguestDuplicates(['a', 'ab', 'abc', 'abcd'])).toEqual([
    'ab',
    'abc',
    'abcd',
  ])
})

test('remove shortest string when not sorted', () => {
  expect(getLonguestDuplicates(['ea', 'bab', 'd', 'fabc', 'cbcd'])).toEqual([
    'ea',
    'bab',
    'fabc',
    'cbcd',
  ])
})
