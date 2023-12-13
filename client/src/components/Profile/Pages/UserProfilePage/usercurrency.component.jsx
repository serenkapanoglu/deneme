import { ReactComponent as Star } from "~/assets/star.svg";
import "./usercurrency.styles.scss";

export const Currency = () => {
  return (
    <div className="currency-container">
      <div className="currencyitems">
        <Star className="currencyfigurestar" />
        <span className="currencyfigure">x 0</span>
        <h1 className="currencyfiguredollar">&#36;</h1>
        <span className="currencyfigure">$0.00</span>
      </div>
    </div>
  );
};
