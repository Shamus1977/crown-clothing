import React, {createContext, useState} from 'react';

const addCartItem = (cartItems, productToAdd) => {
  //find if cart contains item
  console.log(productToAdd);
  let cartItem = cartItems.find(item => item.id === productToAdd.id);
  //If found increment quantity
  if(cartItem){
    const newCartItems = cartItems.map(item =>{
      if(item.id === cartItem.id){
        return {...cartItem, quantity: cartItem.quantity + 1};
      }
      return item;
    });
    return newCartItems;
  }
  //return new array with modified items/new item
  //console.log(cartItems);
  return [...cartItems, {...productToAdd, quantity:1}];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  itemCount: 0,
  setCartItems: () => {}
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
    setItemCount(itemCount + 1);
  }

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, itemCount };

  return <CartContext.Provider value={value} >{ children }</CartContext.Provider>
}
