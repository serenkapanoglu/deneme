import React, { useState, useEffect } from "react";
import axios from "axios";

type ProfileComponentProps = {
  logged?: UserData;
};

const ProfileComponent: React.FC<ProfileComponentProps> = ({ logged }) => {
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchProfilePictureUrl = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api${logged?.profimage}`);
        const data: { profilePictureUrl: string } = response.data;
        setProfilePictureUrl(data.profilePictureUrl);
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    if (logged) {
      fetchProfilePictureUrl();
    }
  }, [logged]);

   //{/* Render the ProfilePicComponent */}
  // <ProfilePicComponent logged={logged} />
  return (
    <div>
      {/* Render the profile picture if available *   /}
      {/*profilePictureUrl && */<img src={profilePictureUrl} alt=""  />}
    </div>
  );
};

export default ProfileComponent;
