import types from './types';

const reducer = (state, {type, payload}) => {
    let resText;
  switch(type){
    case types.SENTENCES: {
      return {...state, sentences: payload}
    }
    case types.TEXT: {
      return {
        ...state,
        text: payload
      }
    }
    default:
      throw new Error(`Called TextContext reducer with bad type ${type}`)
  }
}

export default reducer;