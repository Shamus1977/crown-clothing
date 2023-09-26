import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart_icon/CartIcon.components";
import CartDropdown from "../../components/cart_dropdown/CartDropdown.component";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen} = useContext(CartContext);
 
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to='/' >
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop" >
            SHOP
          </Link>
          <Link className="nav-link" to="/checkout" >
            CHECKOUT
          </Link>
          {currentUser ? (
            <span onClick={signOutUser} className="nav-link" >SIGN OUT</span>
          ): (
            <Link className="nav-link" to="/auth" >
            SIGN IN
          </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;