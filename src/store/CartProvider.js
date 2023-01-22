import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    let updatedItems = [...state.items];

    const updatedTotalAmount =
      state.totalAmount + action.value.price * action.value.amount;

    const existingCartItemIndex = updatedItems.findIndex(
      (item) => item.id === action.value.id
    );
    if (existingCartItemIndex >= 0) {
      updatedItems[existingCartItemIndex].amount += action.value.amount;
    } else {
      updatedItems.push(action.value);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  if (action.type === "REMOVE") {
    let updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (item) => item.id === action.value
    );

    const existingItem = updatedItems[existingCartItemIndex];
    const reducedTotalAmount = state.totalAmount - existingItem.price;

    if (existingItem.amount <= 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      existingItem.amount -= 1;
    }

    return {
      items: updatedItems,
      totalAmount: reducedTotalAmount
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD",
      value: item
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE",
      value: id
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
