import React, { useState} from 'react';

import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form_input/FormInput.component';
import './sign-in-form.styles.scss';
import Button from '../button/Button.component';

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(user);
      resetFormFields();
    } catch (err) {
      console.log("Error from SignUpForm: onSubmit: "+ err.message);
    }
    resetFormFields();
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({...formFields, [name]: value});
  }

  return (
    <div className='sign-up-contianer' >
      <h2>Already have an account?</h2>
      <span>Sign in with email and password.</span>
      <form onSubmit={onSubmitForm}>
        <FormInput label='Email' onChange={handleChange} type="email" required name='email' value={email} />
        <FormInput label='Password' onChange={handleChange} type='password' required name='password' value={password} />
        <div className='buttons-container'>
          <Button type='submit' >Sign In</Button>
          <Button type='button' onClick={signInWithGoogle} buttonType='google'>Google Sign In</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;