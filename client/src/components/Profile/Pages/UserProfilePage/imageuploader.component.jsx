import React, { useState } from 'react';

export const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {image && <img className='imageuploaded' src={URL.createObjectURL(image)} alt="" />}
    </div>
  );
};