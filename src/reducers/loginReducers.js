export default(state = [], action) => {
  switch(action.type) {
    // Check if action dispatched is
    case 'SET_LOGIN_STATUS':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      };
    case 'SET_LOGIN_DATA':
      return {
        ...state,
        loginData: action.loginData
      };
    default:
      return state;
  }
};
