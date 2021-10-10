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
        expect(fnRes.toString()).toBe(expectedArrOutput.toString());
      })
    })
  })

  describe('ingWords', () => {
    //@TODO: make this SKIP words that ONLY have 4 letters and end ing 'ing' maybe?!
    describe('ing words return successfully', () => {
      const correctWords = ['sing','walking', 'ring', 'dancing'];
      correctWords.forEach(matchingWord => {
        let fnRes = ingWords(matchingWord)
        it(`${matchingWord}`, () => {
          expect(fnRes[0]).toBe(matchingWord)
        })
      })
    })
    describe('non-ing words return null', () => {
      const incorrectWords = ['sung', 'brought', 'hinges', 'bingbong'];
      incorrectWords.forEach(nonMatchingWord => {
        let fnRes = ingWords(nonMatchingWord)
        it(`${nonMatchingWord}`, () => {
          expect(fnRes).toBe(null)
        })
      })
    })
  })
})