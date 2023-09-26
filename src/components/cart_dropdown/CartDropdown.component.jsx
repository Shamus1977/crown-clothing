import React, { useContext }  from'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button.component';
import CartItem from '../cart_item/CartItem.component';
import { CartContext } from '../../contexts/cart.context';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const navigate = useNavigate();
  const { cartItems, setIsCartOpen } = useContext(CartContext);

  const goTocheckout = () => {
    navigate("/checkout");
    setIsCartOpen(false);
  }

  return (
    <div className='cart-dropdown-container' >
      <div className='cart-items'>
        {cartItems.map(item => (
          <CartItem key={item.id} cartItem={item}  />
        ))}
      </div>
      <Button onClick={goTocheckout}>CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown;