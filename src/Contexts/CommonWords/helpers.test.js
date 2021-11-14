import { sortByWordAlpha } from './helpers';
import wordList from './mock-word-list-arr.json';
describe('CommonWords Context -> sortByWordsAlpha helper', () => {
  let res = wordList.sort(sortByWordAlpha);
  it('works', () => {
    expect(JSON.stringify(res)).toBe(JSON.stringify([
      { word: 'all', occurances: 4 },
      { word: 'america', occurances: 3 },
      { word: 'are', occurances: 4 },
      { word: 'obama', occurances: 3 },
      { word: 'our', occurances: 6 },
      { word: 'people', occurances: 5 },
      { word: 'power', occurances: 3 },
      { word: 'president', occurances: 5 },
      { word: 'will', occurances: 4 },
      { word: 'your', occurances: 4 }
    ]))
  })
})