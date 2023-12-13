import { ReactComponent as UserDropdownImg } from "~/assets/userdropdownicon.svg";
import { useContext } from "react";
import { UserDropdownContext } from "~/contexts/userdropdown.context";
import "./userdropdownicon.styles.scss";

export const UserDropdownIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(UserDropdownContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <UserDropdownImg className="shopping-icon" />
    </div>
  );
};
