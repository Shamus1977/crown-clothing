import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { hasUnreliableEmptyValue } from "@testing-library/user-event/dist/utils";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

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
          {currentUser ? (
            <span onClick={signOutUser} className="nav-link" >SIGN OUT</span>
          ): (
            <Link className="nav-link" to="/auth" >
            SIGN IN
          </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;