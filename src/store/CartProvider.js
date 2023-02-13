import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedAmount =
      state.totalAmount + action.item.price * action.item.amount;
    let updatedItems;
    const existItemIndex = state.items.findIndex(item => item.id === action.item.id)
    const existItem = state.items[existItemIndex];
    if(existItem){
      state.items[existItemIndex].amount = existItem.amount + action.item.amount;
      updatedItems = [...state.items]
    } else{
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  if (action.type === "REMOVE") {
    const item = state.items.find( item => item.id === action.id)
    console.log(item);
    let updatedItems;
    let updatedTotalAmount;
    if (item.amount === 1){
      updatedItems = state.items.filter(item => item.id !== action.id);
      updatedTotalAmount = state.totalAmount - item.price;
    } else{
      item.amount = item.amount - 1;
      updatedItems = [...state.items]
      updatedTotalAmount = state.totalAmount - item.price;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };

  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItem = (item) => {
    dispatchCartState({ type: "ADD", item: item });
  };
  const removeItem = (id) => {
    dispatchCartState({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItem,
    removeItem: removeItem,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
