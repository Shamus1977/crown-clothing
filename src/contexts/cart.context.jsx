import React, {createContext, useEffect, useState} from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  total: 0,
  itemCount: 0,
  cartTotal: 0,
  setCartItems: () => {}
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
    setItemCount(itemCount + 1);
  };

  const removeItemFromCart = (productToAdd) => {
    setCartItems(removeCartItem(cartItems, productToAdd));
    setItemCount(itemCount - 1);
  };

  const clearItemFromCart = (productToRemove) => {
    const itemQuantiy = productToRemove.quantity;
    setCartItems(clearCartItem(cartItems, productToRemove));
    setItemCount(itemCount - itemQuantiy );
  };

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart, 
    removeItemFromCart,
    clearItemFromCart, 
    cartTotal,
    cartItems, 
    itemCount 
  };
  return <CartContext.Provider value={value} >{ children }</CartContext.Provider>
}

const addCartItem = (cartItems, productToAdd) => {
  let cartItem = cartItems.find(item => item.id === productToAdd.id);
  if(cartItem){
    const newCartItems = cartItems.map(item =>{
      if(item.id === cartItem.id){
        return {...cartItem, quantity: cartItem.quantity + 1};
      }
      return item;
    });
    return newCartItems;
  }
  return [...cartItems, {...productToAdd, quantity:1}];
};

const removeCartItem = (cartItems, productToRemove) => {
  let cartItem = cartItems.find(item => item.id === productToRemove.id);
  if(cartItem.quantity === 1){
    const newCartItemArray = cartItems.filter(item => item.id !== cartItem.id);
    return newCartItemArray;
  }else{
    return cartItems.map(item => {
      return item.id === cartItem.id ? {...item, quantity: item.quantity - 1} : item;
    });
  }
};

const clearCartItem = (cartItems, productToRemove) => {
  const newCartItemArray = cartItems.filter(item => item.id !== productToRemove.id);
  return newCartItemArray;
};

