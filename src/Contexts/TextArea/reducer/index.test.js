import reducer from './';

describe('TextArea reducer', () => {
  describe('SENTENCES', () => {
    let a = {};
    let rr = reducer(a, {type: 'SENTENCES', payload: 'mock payload here'})
    it('updates 1 state var', () => {
      expect(Object.keys(rr).length).toBe(1)
    })
    it('sets sentences state from payload', () => {
      expect(rr.sentences).toBe('mock payload here');
    })
  })

  describe('WORD_LENGTH', () => {
    let a = {};
    let rr = reducer(a, {type: 'WORD_LENGTH', payload: 'mock payload here'})
    it('updates 1 state var', () => {
      expect(Object.keys(rr).length).toBe(1)
    })
    it('sets wordLength state from payload', () => {
      expect(rr.wordLength).toBe('mock payload here');
    })
  })

  describe('TEXT', () => {
    let a = {};
    let rr = reducer(a, {type: 'TEXT', payload: 'mock payload here'})
    it('updates 1 state var', () => {
      expect(Object.keys(rr).length).toBe(1)
    })
    it('sets text state from payload', () => {
      expect(rr.text).toBe('mock payload here');
    })
  })

  describe('MAX_WORDS', () => {
    let a = {};
    let rr = reducer(a, {type: 'MAX_WORDS', payload: 'mock payload here'})
    it('updates 1 state var', () => {
      expect(Object.keys(rr).length).toBe(1)
    })
    it('sets maxWordsPerSentence state from payload', () => {
      expect(rr.maxWordsPerSentence).toBe('mock payload here');
    })
  })

  describe('THEME', () => {
    let a = {};
    describe('without theme in payload', () => {
      let rr = reducer(a, {type: 'THEME', payload: null})
      it('updates 2 state vars', () => {
        expect(Object.keys(rr).length).toBe(2)
      })
      it('sets curColor and theme from payload', () => {
        expect(rr.curColor).toBe(null);
        expect(rr.theme).toBe(null);
      })
    })
     describe('with theme in payload', () => {
      let rr = reducer(a, {type: 'THEME', payload: 'saucy'})
      it('updates 2 state vars', () => {
        expect(Object.keys(rr).length).toBe(2)
      })
      it('sets curColor and theme from payload', () => {
        expect(rr.curColor).not.toBe(null);
        expect(rr.theme).toBe('saucy');
      })
    })
  })
})

/*
  case UPDATE_DISPLAY_TEXT_FROM_AREA:
    return {
      ...state,
      selectedAreaArr: action.payload,
      displayText: updateDisplayText(state.sentences, action.payload),
    };

  case THEME:
    const randLength = Math.floor(Math.random() * themeColors.length);
    let randClr = null;
    if (action.payload) {
      randClr = themeColors[randLength];
    }
    return {
      ...state,
      theme: action.payload,
      curColor: randClr
    };

  default:
    return { ...state, text: action.payload };
    break;
  }
};
*/