import React, { useState, createContext } from "react";
// import axios from "axios";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = (props) => {
  const [shoppingCart, setShoppingCart] = useState([]);

  return (
    <ShoppingCartContext.Provider value={[shoppingCart, setShoppingCart]}>
      {props.children}
    </ShoppingCartContext.Provider>
  );
};
