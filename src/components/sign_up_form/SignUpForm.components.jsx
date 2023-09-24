import React, { useState, useContext} from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form_input/FormInput.component';
import './sign-up-form.styles.scss';
import Button from '../button/Button.component';
import { UserContext } from '../../contexts/user.context';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }
  const onSubmitForm = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = formFields;
    if(!displayName || !email || !password || !confirmPassword){
      alert("All fields of signup form are required.")
      return;
    }
    if(password !== confirmPassword){
      alert('Passwords must match');
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, {displayName: displayName});
    } catch (err) {
      console.log("Error from SignUpForm: onSubmit: "+ err.message);
      if(err.code === 'auth/email-already-in-use'){
        alert('Cannot create user, email already in use.');
      }
    }finally{
      resetFormFields();
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({...formFields, [name]: value});
  }

  return (
    <div className='sign-up-contianer' >
      <h2>Don't have an account, yet?</h2>
      <span>Sign up with email and password.</span>
      <form onSubmit={onSubmitForm}>
        <FormInput label='Display Name' onChange={handleChange} type='text' required name='displayName' value={displayName} />
        <FormInput label='Email' onChange={handleChange} type="email" required name='email' value={email} />
        <FormInput label='Password' onChange={handleChange} type='password' required name='password' value={password} />
        <FormInput label='Confirm Password' onChange={handleChange} type='password' required name='confirmPassword' value={confirmPassword} />
        <Button type='submit' >Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm;