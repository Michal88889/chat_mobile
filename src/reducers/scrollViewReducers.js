export default(state = [], action) => {
  switch(action.type) {
    // Check if action dispatched is
    case 'SET_SCROLLVIEW':
      return {
        ...state,
        scrollView: action.scrollView
      };
    default:
      return state;
  }
};
