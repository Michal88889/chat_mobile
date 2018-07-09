export const setLoginStatus = (loggedIn) => {
  // Return action
  return {
    // Unique identifier
    type: 'SET_LOGIN_STATUS',
    // Payload
    isLoggedIn: loggedIn
  }
};

export const setLoginData = (loginData) => {
  // Return action
  return {
    // Unique identifier
    type: 'SET_LOGIN_DATA',
    // Payload
    loginData: loginData
  }
};
