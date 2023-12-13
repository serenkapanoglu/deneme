import React from 'react';
import { JoinlistForm } from './joinlistform';
import {useState} from 'react';
 
export function JoinList() {

    const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    setIsShown(current => !current);
  };

        return(
            <div>
            {isShown && <JoinlistForm />}
            <button type="button" className="btn btn-outline-light"
            onClick={handleClick}>
            Join List
            </button>
            </div>
        )

    }