import reducer from './';

describe('TextContext', () => {
  it('throws err with bad type', () => {
    expect(() => {
      return reducer({}, {type: "SAUCE"})
    }).toThrow(`Called TextContext reducer with bad type SAUCE`)
  })
  describe('SENTENCES', () => {
    let a = {}
    let rr = reducer({}, {type: "SENTENCES", payload: 'sauce'})
    it('sets 1 key', () => {
      expect(Object.keys(rr).length).toBe(1);
    })
    it('sets sentences from payload', () => {
      expect(rr.sentences).toBe('sauce')
    })
  })
  describe('TEXT', () => {
    let a = {}
    let rr = reducer({}, {type: "TEXT", payload: 'sauce'})
    it('sets 1 key', () => {
      expect(Object.keys(rr).length).toBe(1);
    })
    it('sets text from payload', () => {
      expect(rr.text).toBe('sauce')
    })
  })
})