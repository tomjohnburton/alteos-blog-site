export default (state = 0, action) => {
  switch (action.type) {
    case "ADD_LIKE":
      return action.payload;

    default:
      return state;
  }
};
