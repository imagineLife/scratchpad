import {
  convertStrToWordArr,
  getLongestThirty,
  getWordsByCount,
  getWordsByLength,
  ingWords,
  edWords,
  getSentences
} from './'
describe('stats fns', () => {
  describe('convertStrToWordArr', () => {
    let testSentenceOne = 'the quick brown fox jumps over the lazy dog.'
    let expectedArrRes = [
      'the',   'quick',
      'brown', 'fox',
      'jumps', 'over',
      'the',   'lazy',
      'dog'
    ]
    describe(`SENTENCE: ${testSentenceOne}`, () => {
      let fnRes = convertStrToWordArr(testSentenceOne)
      let expectedArrOutput = [
      'the',   'quick',
      'brown', 'fox',
      'jumps', 'over',
      'the',   'lazy',
      'dog'
    ];
      
      it('is an arr', () => {
        expect(Array.isArray(fnRes)).toBe(true);
      })
      it('has 9 items', () => {
        expect(fnRes.length).toBe(9);
      })
      it('matches expected array', () => {
        expect(fnRes).toBe(expectedArrOutput);
      })
    })
  })
})