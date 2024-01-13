// // Initial state
export const initialState = {
  basket: [],
};

// // Action types as constants (makes it easier to manage and avoid typo errors)
const actionTypes = {
  ADD_TO_BASKET: "ADD_TO_BASKET",
  REMOVE_FROM_BASKET: "REMOVE_FROM_BASKET",
  SET_USER: "SET_USER",
  EMPTY_BASKET: "EMPTY_BASKET",
};

// // Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_BASKET:
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case actionTypes.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as it's not in the basket!`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};

export default reducer;
