import React, { useContext } from 'react';
import Button from '../button/Button.component';
import { CartContext } from '../../contexts/cart.context';
import './product-card.styles.scss';

const ProductCard = ({product}) => {
  const {name, price, imageUrl} = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => {
    addItemToCart(product);
    console.log(product);
  };

  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${name}`} />
      <div className='footer' >
        <span className='name' >{name}</span>
        <span className='price' >{price}</span>
      </div>
      <Button onClick={addProductToCart} buttonType='inverted' >Add To Cart</Button>
    </div>
  )
}

export default ProductCard;