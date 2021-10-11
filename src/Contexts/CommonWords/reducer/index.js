const reducer = (state, {type, payload}) => {
  switch (type) {
  case 'LONGEST_WORDS':
    return {
      ...state,
      'Longest Words': payload,
    };
    break;

  case 'COMMON_WORDS':
    return {
      ...state,
      'Common Words': payload,
    };
    break;

  case 'ACTION_WORDS':
    return {
      ...state,
      'Action Words': payload,
    };
    break;

  default:
    throw new Error(`CALLED COMMON-WORDS REDUCER WITH BAD TYPE: ${type}`);
    break;
  }
};
module.exports = reducer;