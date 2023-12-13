import { ReactComponent as FollowBtn } from "~/assets/follow.svg";
import { ReactComponent as MessageBtn } from "~/assets/message.svg";
import DefaultProfilePic from "~/images/defaultprof1.svg";
import { useState } from "react";
import { ProfPicModal } from "./profpicmodal.component";
import { ProfBackgroundPicModal } from "./profbackgroundmodal.component";
import { useContext } from "react";
import { UserContext } from "~/contexts/user.context";
import "./userprofile-headdisplay.styles.scss";

export const UserProfileHeader = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openBackModal, setOpenBackModal] = useState(false);
  const [backgroundHovered, setBackgroundHovered] = useState(false);
  const [userSummaryHoverd, setuserSummaryHoverd] = useState(false);
  const { currentUser } = useContext(UserContext);

  // handle Background Hover
  const handleBackgroundHover = () => {
    setBackgroundHovered(true);
    setuserSummaryHoverd(false);
  };

  // handle Background Mouse Leave
  const handleBackgroundMouseLeave = () => {
    setBackgroundHovered(false);
  };

  // handle User Summary Hover
  const handleUserSummaryHover = () => {
    setuserSummaryHoverd(true);
    setBackgroundHovered(false);
  };
  // handle User Summary Mouse Leave
  const handleUserSummaryMouseLeave = () => {
    setuserSummaryHoverd(false);
    setBackgroundHovered(true);
  };

  return (
    <div
      onMouseLeave={handleBackgroundMouseLeave}
      onMouseEnter={handleBackgroundHover}
      className="profilebackground"
    >
      {backgroundHovered ? (
        <>
          {" "}
          <button className="modal1" onClick={() => setOpenBackModal(true)}>
            EDIT
          </button>
        </>
      ) : (
        ""
      )}
      <ProfBackgroundPicModal
        open={openBackModal}
        onClose={() => setOpenBackModal(false)}
      />
      <div
        onMouseLeave={handleUserSummaryMouseLeave}
        onMouseEnter={handleUserSummaryHover}
        className="usersummary"
      >
        <div className="usersummarydetails">
          <div className={`${userSummaryHoverd ? "" : "editButton"}`}>
            {
              <button className={`modal`} onClick={() => setOpenModal(true)}>
                EDIT
              </button>
            }
          </div>
          <ProfPicModal open={openModal} onClose={() => setOpenModal(false)} />
          <img
            style={{
              position: "absolute",
              top: "6.723rem",
              borderRadius: "100%",
              width: "29%",
              height: "auto",
            }}
            src={currentUser?.photoURL}
            alt=""
          />
          <img
            src={DefaultProfilePic}
            alt="defaultpic1"
            style={{ width: "35%", height: "auto" }}
          />
          <span className="usersumdetailname">
            {currentUser?.displayName ? currentUser?.displayName : "Your name"}
          </span>
          <span className="usersumdetailtitle">BUSINESS OWNER</span>
          <div className="usersumitemgroup">
            <div className="usersumdetailitem">
              <span>0</span>
              <span style={{ padding: "10px" }}>FOLLOWERS</span>
            </div>
            <div className="usersumdetailitem">
              <span>0</span>
              <span style={{ padding: "10px" }}>SUPPORTERS</span>
            </div>
            <div className="usersumdetailitem1">
              <FollowBtn style={{ marginTop: -5 }} />
              <span className="usersumdetailfollow">FOLLOW</span>
            </div>
            <div className="usersumdetailitem1">
              <MessageBtn style={{ marginTop: -6 }} />
              <span className="usersumdetailmessage">MESSAGE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
