export default (state = [], action) => {
  switch (action.type) {
    case "EDIT_POST":
      return [...state, action.payload];

    default:
      return state;
  }
};
