export const changeNav = (view) => {
  // Return action
  return {
    // Unique identifier
    type: 'CHANGE_NAV',
    // Payload
    view: view
  }
}
