import { ReactComponent as EmptyStar } from "~/assets/emptystar.svg";
import "./tutorial-checklist.styles.scss";

export const TutorialChecklist = () => {
  return (
    <div className="tutorial-container">
      <div className="tutorial-list">
        <span className="tutorial-list-item-head">T-3 UNTIL LAUNCH</span>
        <span className="tutorial-list-item">Upload a profile image</span>
        <span className="tutorial-list-item">Upload a background image</span>
        <span className="tutorial-list-item">Add a bio</span>
        <span className="tutorial-list-item">Add a User Name</span>
        <span className="tutorial-list-item">Make a post</span>
      </div>
      <div className="emptystar">
        <EmptyStar className="emptystar-size" />
        <EmptyStar className="emptystar-size" />
        <EmptyStar className="emptystar-size" />
        <EmptyStar className="emptystar-size" />
        <EmptyStar className="emptystar-size" />
      </div>
    </div>
  );
};
