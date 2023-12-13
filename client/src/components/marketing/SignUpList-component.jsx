import React from 'react';
import {useState} from 'react';
import { SignupForm } from './signupform';
 
export function SignUpList() {

    const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    setIsShown(current => !current);
  };

        return(
            <div>
            {isShown && <SignupForm />}
            <button type="button" className="btn btn-outline-light"
            onClick={handleClick}>
            Sign Up
            </button>
            </div>
        )

    }