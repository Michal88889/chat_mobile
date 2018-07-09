const defaultState = {
  messageCount: 0,
  messages: {},
  users: {}
};
export default(state = defaultState, action) => {
  switch(action.type) {
    // Check if action dispatched is
    // SET_HTTP and act on that
    case 'COUNT_MESSAGE':
      let tmpMsgCount = state.messages + 1;
      return {
        ...state,
        messageCount: tmpMsgCount
      };
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.messages
      };
    case 'SET_USERS':
      return {
        ...state,
        users: action.users
      };
    default:
      return state;
  }
};
