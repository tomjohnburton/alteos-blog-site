export default (state = [], action) => {
  switch (action.type) {
    case "DELETE_POST":
      return [...state, action.payload];

    default:
      return state;
  }
};
