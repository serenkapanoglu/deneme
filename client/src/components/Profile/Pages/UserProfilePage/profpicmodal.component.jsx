import "./profpicmodal.styles.scss";
import image from "~/images/univers.png";
import profpic from "~/images/017diamond.svg";
import profpic1 from "~/images/defaultprof1.svg";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

export const ProfPicModal = ({ open, onClose }) => {
  const [imageFormData, setImageFormData] = useState("");
  const [profileLink, setProfileLink] = useState("");
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  // handle Profile Img Upload
  const handleProfileImgUpload = (event) => {
    event.preventDefault();
    const image = event.target.image.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    setImageFormData(formData);
    console.log(formData);
  };

  // handle Profile Upload
  const handleProfileUpload = (event) => {
    event.preventDefault();
    console.log(imageFormData);

    setImageUploadLoading(true);

    // Image upload URL
    const URL = `https://api.imgbb.com/1/upload?key=f1d30ea7c8fecc2dd9602fc06cb43f8e`;
    fetch(URL, {
      method: "POST",
      body: imageFormData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProfileLink(data.data.display_url);
        if (data.success) {
          setImageUploadLoading(false);
        }
      })
      .catch((error) => console.log(error));
  };

  if (!open) return null;
  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="profpicmodalContainer"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div onClick={onClose} className="profpiccloseBtn">
          X
        </div>
        <div className="profpiccontent">
          <p>Upload or select from the following images</p>
          <button className="profpicimg">
            <img
              src={profpic}
              alt=""
              style={{ width: "50%", height: "auto", margin: "auto" }}
            />
            <img
              src={profileLink ? profileLink : profpic1}
              alt=""
              style={{ width: "50%", height: "auto", margin: "auto" }}
            />
          </button>
        </div>
        <div className="profpicbtnContainer">
          <form onSubmit={handleProfileImgUpload}>
            <button>
              <input name="image" type="file" />
            </button>
          </form>
          <button
            style={{ display: "flex", alignItems: "center" }}
            onClick={handleProfileUpload}
            className="btn btn-outline-light"
          >
            {imageUploadLoading ? (
              <Spinner size="sm" animation="grow" />
            ) : (
              "Upload"
            )}
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
  );
};
