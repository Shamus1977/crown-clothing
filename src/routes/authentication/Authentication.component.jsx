import { useEffect } from "react"; 
import { createUserDocumentFromAuth, auth } from "../../utils/firebase/firebase.utils";
import { getRedirectResult } from "firebase/auth";

import SignUpForm from "../../components/sign_up_form/SignUpForm.components";
import SignInForm from "../../components/sign_in_form/SignInForm.components";
import './authentication.styles.scss';

const Authentication = () => {
  useEffect( () => {
    const response = getRedirectResult(auth).then(response => {
      try {
        if(response){
          const userRef = createUserDocumentFromAuth(response?.user);
        }
      } catch (error) {
        console.log("useEffect in signIn: "+error.message);
      }
    });
  }, []);

  return (
    <div className="authentication-container">
       {/* <button  onClick={logGoogleRedirectUser} >Sign in with google redirect.</button> */}
      <div>
        <SignInForm />
      </div>
      <div>
        <SignUpForm />
      </div>
    </div>
  )
}

export default Authentication;