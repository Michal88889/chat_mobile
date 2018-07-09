const defaultVar = {
  view: 'Chat'
}
export default(state = defaultVar, action) => {
  switch(action.type) {
    // Check if action dispatched is
    // CHANGE_NAV and act on that
    case 'CHANGE_NAV':
      return {
        ...state,
        view: action.view
      };
    default:
      return state;
  }
};
