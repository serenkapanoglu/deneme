import { ReactComponent as FollowBtn } from "~/assets/follow.svg";
import { ReactComponent as MessageBtn } from "~/assets/message.svg";
import otheruser from "~/assets/otheruser.svg";
import { useContext } from "react";
import { UserContext } from "~/contexts/user.context";
import "./otheruser-headdisplay.styles.scss";

export const OtherUserProfileHeader = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="otherprofilebackground">
      <div className="usersummary">
        <div className="usersummarydetails">
          <img
            src={otheruser}
            alt="defaultpic1"
            style={{ width: "40%", height: "auto" }}
          />
          <span className="usersumdetailname">Other User</span>
          <span className="usersumdetailtitle">Other Title</span>
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
              <FollowBtn style={{ marginTop: -4 }} />
              <button className="othersumdetailfollow">FOLLOW</button>
            </div>
            <div className="usersumdetailitem1">
              <MessageBtn style={{ marginTop: -4 }} />
              <button className="othersumdetailmessage">MESSAGE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
