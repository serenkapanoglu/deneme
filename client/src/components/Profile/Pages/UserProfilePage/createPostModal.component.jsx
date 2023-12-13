import { ReactComponent as NotificationImg } from "~/assets/profilepic.svg";
import { ImageUploader } from "./imageuploader.component";
import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "~/postSlice.js";
import { selectAllUsers } from "~/usersSlice.js";
import { UserContext } from "~/contexts/user.context";
import "./createPostModal.styles.scss";

export const CreatePostModal = ({ open, onClose }) => {
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const { currentUser } = useContext(UserContext);

  const users = useSelector(selectAllUsers);

  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const dispatch = useDispatch();

  const onSavePostClicked = () => {
    if (content) {
      dispatch(postAdded(content, `${currentUser?.displayName}`));
      setContent("");
    }
    onClose();
  };

  const canSave = Boolean(content);

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  if (!open) return null;

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="createpostmodalContainer"
        style={{ backgroundColor: "#1C2126" }}
      >
        <div onClick={onClose} className="createpostcloseBtn">
          X
        </div>
        <NotificationImg />
        <div style={{ dislpay: "flex", paddingLeft: 70, color: "white" }}>
          {currentUser?.displayName}
        </div>
        <ImageUploader />
        <form>
          <input
            type="text"
            value={content}
            id="postContent"
            name="postContent"
            onChange={onContentChanged}
            placeholder="Text/Caption"
          />
          <div className="createpostbtnContainer">
            <button
              type="button"
              onClick={onSavePostClicked}
              disabled={!canSave}
              className="btn btn-outline-light"
            >
              <span className="bold">Create</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
