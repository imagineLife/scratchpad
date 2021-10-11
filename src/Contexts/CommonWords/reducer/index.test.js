import reducer from './';
describe('CommonWords Reducer', () => {
  describe('LONGEST_WORDS sets Longest Words', () => {
    let a = {};
    let rr = reducer(a, {type: "LONGEST_WORDS", payload: 'watermelon'}) 
    it('updates 1 state var', () => {
      expect(Object.keys(rr).length).toBe(1)
    })
    it('updates "Longest Words" key', () => {
      expect(rr['Longest Words']).toBe('watermelon')
    })
  })
})

/*
  it('LONGEST_WORDS',() => {})
    return {
      ...state,
      'Longest Words': action.payload,
    };
    break;

  it('COMMON_WORDS',() => {})
    return {
      ...state,
      'Common Words': action.payload,
    };
    break;

  it('ACTION_WORDS',() => {})
    return {
      ...state,
      'Action Words': action.payload,
    };
    break;
*/