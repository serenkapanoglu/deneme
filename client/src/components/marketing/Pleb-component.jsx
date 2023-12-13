import React from 'react';
import {useState} from 'react';
 
export function Pleb() {

    const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    setIsShown(current => !current);
  };

        return(
            <div>
            
            <button type="button" className="btn btn-outline-light"
            onClick={handleClick}>
            Keep Being a PLEB
            </button>
            </div>
        )

    }