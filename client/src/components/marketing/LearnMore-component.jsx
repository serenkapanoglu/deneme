import React from 'react';
import {useState} from 'react';
 
export function LearnMore() {

    const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    setIsShown(current => !current);
  };

        return(
            <div>
            
            <button type="button" className="btn btn-outline-light"
            onClick={handleClick}>
            Learn More
            </button>
            </div>
        )

    }