const reducer = (state, action) => {
  switch (action.type) {
  case 'LONGEST_WORDS':
    return {
      ...state,
      'Longest Words': action.payload,
    };
    break;

  case 'COMMON_WORDS':
    return {
      ...state,
      'Common Words': action.payload,
    };
    break;

  case 'ACTION_WORDS':
    return {
      ...state,
      'Action Words': action.payload,
    };
    break;

  default:
    return { ...state };
    break;
  }
};
module.exports = reducer;