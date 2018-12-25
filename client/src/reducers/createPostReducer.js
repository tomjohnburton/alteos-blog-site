export default (state = [], action) => {
  switch (action.type) {
    case "CREATE_POST":
      return [...state, action.payload];

    default:
      return state;
  }
};
