import { UniversHeader } from "~/login/aonverseheader";
import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as Star } from "~/assets/star.svg";
import { ReactComponent as Comment } from "~/assets/comment.svg";
import { UserDropdownIcon } from "./userdropdownicon.component.jsx";
import { ReactComponent as NotificationImg } from "~/assets/profilepic.svg";
import { UserDropdownContext } from "~/contexts/userdropdown.context";
import { UserDropdown } from "./userdropdownaction.component";
import "./headermain.styles.scss";
import { UserContext } from "~/contexts/user.context";
import { useNavigate } from "react-router-dom";
import Searchimg from "~/assets/search-white.svg";
import { Search } from "./search.component";

export const HeaderMain = () => {
  const { isCartOpen } = useContext(UserDropdownContext);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const navUseProf = async () => {
    navigate(`/userprofile/${currentUser?.uid}`);
  };

  return (
    <Fragment>
      <div className="userbackground">
        <div className="navigation">
          <button className="logo-container" onClick={navUseProf}>
            <UniversHeader className="logo" />
          </button>
          <div className="nav-links-container">
            <Search />
            <img
              src={Searchimg}
              alt=""
              style={{ marginRight: 20, width: "3%" }}
            />
            <Link>
              <Star className="headerimg" />
            </Link>
            <span className="headerdigits">0</span>
            <Link>
              <Comment className="headerimg" />
            </Link>
            <span className="headerdigits">0</span>

            {currentUser?.photoURL ? (
              <>
                <Link>
                  <img
                    style={{
                      width: "40px",
                      borderRadius: "100%",
                      marginRight: ".6rem",
                    }}
                    src={currentUser?.photoURL}
                    alt={currentUser?.displayName}
                  />
                </Link>
              </>
            ) : (
              <>
                <Link>
                  <NotificationImg className="headerimg" />{" "}
                </Link>
              </>
            )}
            <UserDropdownIcon />
            {isCartOpen && <UserDropdown />}
          </div>
        </div>
        <Outlet />
      </div>
    </Fragment>
  );
};
