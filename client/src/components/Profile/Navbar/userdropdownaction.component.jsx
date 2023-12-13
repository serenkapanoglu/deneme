import "./userdropdownaction.styles.scss";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "~/utils/firebase/firebase.utils.js";
import { useContext } from "react";
import { UserDropdownContext } from "~/contexts/userdropdown.context";
import { ReactComponent as NotificationImg } from "~/assets/profilepic.svg";
import { ReactComponent as SimpleCrown } from "~/assets/simplecrown.svg";
import { ReactComponent as GearImg } from "~/assets/gear.svg";
import { ReactComponent as AddSign } from "~/assets/addsign.svg";
import { ReactComponent as Warning } from "~/assets/warning.svg";
import { ReactComponent as Power } from "~/assets/power.svg";
import { UserContext } from "~/contexts/user.context";
import SunImg from "~/assets/sunimg.png";

export const UserDropdown = () => {
  const { isCartOpen, setIsCartOpen } = useContext(UserDropdownContext);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const signOutUser = async () => {
    await signOut(auth);
    await setIsCartOpen(!isCartOpen);
    await navigate("/");
  };

  const navSet = async () => {
    navigate("settings");
    await setIsCartOpen(!isCartOpen);
  };
  const navAchiev = async () => {
    navigate("achievements");
    await setIsCartOpen(!isCartOpen);
  };
  const navUseProf = async () => {
    navigate(`/userprofile/${currentUser?.uid}`);
    await setIsCartOpen(!isCartOpen);
  };
  const navConPref = async () => {
    navigate("contentpreference");
    await setIsCartOpen(!isCartOpen);
  };
  const navReportBug = async () => {
    navigate("reportbug");
    await setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        <div className="list-item">
          <NotificationImg
            style={{ height: 70, width: "auto", paddingLeft: 10 }}
          />
          <button
            style={{
              fontSize: 20,
              background: "none",
              border: "none",
              color: "white",
              paddingLeft: 10,
            }}
            onClick={navUseProf}
          >
            {currentUser?.displayName}
          </button>
          <span
            style={{
              fontSize: 12,
              display: "flex",
              marginLeft: 90,
              marginBottom: 5,
              marginTop: -25,
            }}
          >
            View Your Profile
          </span>
        </div>
        <div className="list-item">
          <SimpleCrown style={{ height: 40, width: "auto", paddingLeft: 20 }} />
          <button
            style={{
              fontSize: 20,
              background: "none",
              border: "none",
              color: "white",
              paddingLeft: 90,
              marginTop: -35,
              display: "flex",
            }}
            onClick={navAchiev}
          >
            ACHIEVEMENTS
          </button>
        </div>
        <div className="list-item">
          <GearImg style={{ height: 40, width: "auto", paddingLeft: 20 }} />
          <button
            style={{
              fontSize: 20,
              background: "none",
              border: "none",
              color: "white",
              paddingLeft: 90,
              marginTop: -35,
              display: "flex",
            }}
            onClick={navSet}
          >
            SETTINGS
          </button>
        </div>
        <div className="list-item">
          <AddSign style={{ height: 40, width: "auto", paddingLeft: 20 }} />
          <button
            style={{
              fontSize: 20,
              background: "none",
              border: "none",
              color: "white",
              paddingLeft: 90,
              marginTop: -35,
              display: "flex",
            }}
            onClick={navConPref}
          >
            CONTENT PREFERENCE
          </button>
        </div>
        <div className="list-item">
          <img
            src={SunImg}
            alt=""
            style={{ height: 50, width: "auto", paddingLeft: 15 }}
          />
          <button
            style={{
              fontSize: 20,
              background: "none",
              border: "none",
              color: "white",
              paddingLeft: 90,
              marginTop: -43,
              display: "flex",
            }}
          >
            LIGHT MODE
          </button>
        </div>
        <div className="list-item">
          <Warning style={{ height: 40, width: "auto", paddingLeft: 20 }} />
          <button
            style={{
              fontSize: 20,
              background: "none",
              border: "none",
              color: "white",
              paddingLeft: 90,
              marginTop: -35,
              display: "flex",
            }}
            onClick={navReportBug}
          >
            REPORT A BUG
          </button>
        </div>
        <div className="list-item">
          <Power style={{ height: 40, width: "auto", paddingLeft: 20 }} />
          <button
            style={{
              fontSize: 20,
              background: "none",
              border: "none",
              color: "white",
              paddingLeft: 90,
              marginTop: -35,
              display: "flex",
            }}
            onClick={signOutUser}
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};
