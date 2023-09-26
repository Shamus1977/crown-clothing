import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const {clearItemFromCart, addItemToCart, removeItemFromCart} = useContext(CartContext);
  const { name, imageUrl, price, quantity } = cartItem;

  const handleClearItemFromCart = () => {
    clearItemFromCart(cartItem);
  }

  const handleRemoveItemFromCart = () => {
    removeItemFromCart(cartItem);
  }

  const handleAddItemToCart = () => {
    addItemToCart(cartItem);
  }

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'> {name} </span>
      <span className='quantity'>
        <div onClick={handleRemoveItemFromCart} className='arrow'>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div onClick={handleAddItemToCart} className='arrow' >
          &#10095;
        </div>
      </span>
      <span className='price'> {price}</span>
      <div onClick={handleClearItemFromCart} className='remove-button' >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;