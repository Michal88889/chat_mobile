export const noteMessage = () => {
  // Return action
  return {
    // Unique identifier
    type: 'COUNT_MESSAGE',
  }
};

export const saveMessages = (messages) => {
  // Return action
  return {
    // Unique identifier
    type: 'SET_MESSAGES',
    // Payload
    messages: messages
  }
};

export const saveUsers = (users) => {
  // Return action
  return {
    // Unique identifier
    type: 'SET_USERS',
    // Payload
    users: users
  }
};
