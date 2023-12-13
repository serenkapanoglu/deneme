import { ReactComponent as NotificationImg } from "~/assets/profilepic.svg";
import { ReactComponent as EmptyStar } from "~/assets/emptystar.svg";
import { ReactComponent as HeartLike } from "~/assets/likeheart.svg";
import { ReactComponent as Threedots } from "~/assets/threedots.svg";
import { useSelector } from "react-redux";
import { selectAllPosts } from "./postSlice.js";
import { TimeAgo } from "./timeago";
import "./postcard.styles.scss";

export const PostCard = () => {
  const posts = useSelector(selectAllPosts);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderPosts = orderedPosts.map((post) => (
    <div className="singlepost" key={post.id}>
      <div className="userfeedheader">
        <NotificationImg />
        <span className="userfeedheadertxt">{post.displayName}</span>
        <TimeAgo className="userfeedposttime" timestamp={post.date} />
      </div>
      <h4 style={{ color: "white", paddingLeft: 50, fontSize: 25 }}>
        {post.content}
      </h4>
      <div className="interactbtns">
        <HeartLike className="heartstarbtn" />
        <span className="interactcounts">0</span>
        <EmptyStar className="heartstarbtn" />
        <span className="interactcounts">1</span>
        <Threedots className="heartstarbtn" />
      </div>
    </div>
  ));

  return <section className="userfeed-container">{renderPosts}</section>;
};
