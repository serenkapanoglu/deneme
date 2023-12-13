import { TutorialChecklist } from "./tutorial-checklist";
import { CreatePost } from "./post-content-box";
import { UserProfileHeader } from "./userprofile-headdisplay";
import { UserFeed } from "./userfeed.component";
import { Currency } from "~/UserProfilePage/usercurrency.component";
import { BioField } from "~/UserProfilePage/biofield.component";
import { UserTrophies } from "./usertrophies.component";
import "./userhomepage.styles.scss";

export const MyHomePage = () => {
  return (
    <div>
      <UserProfileHeader />
      <CreatePost />
      <UserFeed />
      <TutorialChecklist />
      <Currency />
      <BioField />
      <UserTrophies />
    </div>
  );
};
