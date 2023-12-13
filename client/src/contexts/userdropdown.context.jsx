import { createContext, useState } from 'react';

export const UserDropdownContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {}
});

export const UserDropDownProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const value = {isCartOpen, setIsCartOpen};

    return <UserDropdownContext.Provider value={value}>{children}</UserDropdownContext.Provider>;
};