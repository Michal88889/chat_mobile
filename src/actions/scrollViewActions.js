export const setScrollView = (view) => {
  // Return action
  return {
    // Unique identifier
    type: 'SET_SCROLLVIEW',
    // Payload
    scrollView: view
  }
};
