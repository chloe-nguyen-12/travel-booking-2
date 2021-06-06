import axios from "axios";

const updateDB = (cart) => {
  try {
    const resp = axios.post("/shopping-cart/update-cart", cart);
  } catch (e) {
    console.log(e);
    return;
  }
};

export const addToShoppingCart = (currentCart, setCart, selectedObj) => {
  //make call to backend to add
  setCart((prevShoppingCart) => [...prevShoppingCart, selectedObj]);

  const newCart = [...currentCart, selectedObj];

  updateDB(newCart);

  return;
};

export const deleteFromShoppingCart = (currentCart, setCart, selectedObj) => {
  //make call to backend to delete
  let newCart = JSON.parse(JSON.stringify(currentCart));
  newCart = [...newCart];
  for (let i = 0; i < newCart.length; i++) {
    if (newCart[i].name === selectedObj.name) {
      newCart.splice(i, 1);
      break;
    }
  }
  setCart(newCart);

  updateDB(newCart);

  return true;
};
