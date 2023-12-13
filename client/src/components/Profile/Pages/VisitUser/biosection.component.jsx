import OtherUser from "~/assets/otheruser.svg";
import "./biosection.styles.scss";

export const OtherUserBio = () => {
  return (
    <div className="biosectioncontainer">
      <img className="bioimg" src={OtherUser} alt="" />
      <div className="biotextcontainer">
        <div className="biotext">
          this is all filler text for the bio field, this means nothing. moving
          on moving on moving on. text text text. wowowowowowow owen wilson
          wowowowowo. more random words, more random, text, who knows wha this
          is. What are we talking about, where are we going. i want a million
          dollars. That would be nice!
        </div>
      </div>
    </div>
  );
};
