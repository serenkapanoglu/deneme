import { ReactComponent as NotificationImg } from "~/assets/profilepic.svg";
import { ReactComponent as ImageButton } from "~/assets/image.svg";
import { ReactComponent as VideoButton } from "~/assets/interface.svg";
import { CreatePostModal } from "./createPostModal.component";
import { useState } from "react";
import "./post-content-box.styles.scss";

export function CreatePost() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <div className="createbox-container">
      <NotificationImg />
      <button className="searchbox" onClick={() => setOpenCreateModal(true)}>
        <ImageButton style={{ marginLeft: 870 }} />
        <VideoButton style={{ marginLeft: 15 }} />
      </button>
      <CreatePostModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
    </div>
  );
}
