export default (state = {}, action) => {
  switch (action.type) {
    case "CREATE_POST":
      return action.payload;

    default:
      return state;
  }
};
