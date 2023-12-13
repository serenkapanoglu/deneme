import React from 'react';
import {useState} from 'react';
 
export function DonateButton() {

    const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    setIsShown(current => !current);
  };

        return(
            <div>
            
            <button type="button" className="btn btn-outline-light"
            onClick={handleClick}>
            Donate
            </button>
            </div>
        )

    }