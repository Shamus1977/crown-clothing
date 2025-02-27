import React, { useContext } from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.scss';

const CartIcon= () => {
  const { isCartOpen, setIsCartOpen, itemCount } = useContext(CartContext);
  
  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  }
  return (
    <div onClick={toggleIsCartOpen} className='cart-icon-container' >
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count' >{itemCount}</span>
    </div>
  )
}

export default CartIcon;