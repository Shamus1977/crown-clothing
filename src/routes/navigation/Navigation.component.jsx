import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles.jsx';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart_icon/CartIcon.components";
import CartDropdown from "../../components/cart_dropdown/CartDropdown.component";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen} = useContext(CartContext);
 
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/' >
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop" >
            SHOP
          </NavLink>
          <NavLink to="/checkout" >
            CHECKOUT
          </NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser} >SIGN OUT</NavLink>
          ): (
            <NavLink to="/auth" >
            SIGN IN
          </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;