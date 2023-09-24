import { useEffect } from "react"; 
import { signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect, auth } from "../../utils/firebase/firebase.utils";
import { getRedirectResult } from "firebase/auth";

import SignUpForm from "../../components/sign_up_form/SignUpForm.components";

const SignIn = () => {
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

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  const logGoogleRedirectUser = async () => {
    const { user } = await signInWithGoogleRedirect();
    //const userDocRef = await createUserDocumentFromAuth(user);
    console.log(user);
  }

  return (
    <>
      <div>SignIn</div>
      <button  onClick={logGoogleUser} >Sign in with google popup.</button>
      <button  onClick={logGoogleRedirectUser} >Sign in with google redirect.</button>
      <SignUpForm />
    </>
  )
}

export default SignIn;