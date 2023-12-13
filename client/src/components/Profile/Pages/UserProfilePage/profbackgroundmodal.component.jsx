import "./profbackgroundmodal.styles.scss";
import image from "~/images/univers.png";
import profpic from "~/images/017diamond.svg";
import profpic1 from "~/images/defaultprof1.svg";

export const ProfBackgroundPicModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="profbackmodalContainer"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="modalRight">
          <p onClick={onClose} className="profbackcloseBtn">
            X
          </p>
          <div className="profbackcontent">
            <p>Upload or select from the following images</p>
            <button className="profpicimg">
              <img
                src={profpic}
                alt=""
                style={{ width: "50%", height: "auto", margin: "auto" }}
              />
              <img
                src={profpic1}
                alt=""
                style={{ width: "50%", height: "auto", margin: "auto" }}
              />
            </button>
          </div>
          <div className="profbackbtnContainer">
            <button className="btn btn-outline-light">
              <span className="bold" onClick={{}}>
                Upload
              </span>
            </button>
            <button
              onClick={onClose}
              style={{ marginLeft: 10 }}
              className="btn btn-outline-light"
            >
              <span className="bold">Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
