import "./usertrophies.styles.scss";
import Redcrown from "~/images/016crown.svg";
import Pschent from "~/images/025pschent.svg";
import Diamond from "~/images/017diamond.svg";

export const UserTrophies = () => {
  return (
    <div className="trophycontainer">
      <img src={Redcrown} alt="redcrown" />
      <span className="trophyfigure">x 0</span>
      <img src={Pschent} alt="pschent" />
      <span className="trophyfigure">x 0</span>
      <img src={Diamond} alt="diamond" />
      <span className="trophyfigure">x 0</span>
    </div>
  );
};
