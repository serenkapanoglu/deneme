import { Box, Link, Avatar } from "~/ui";
import { MotionBox } from "~/ui/motion";
import { XIcon } from "~/util/icons";
import { childVariants } from "~/util/motion";
import { Container } from "~/components/Container";
import styles from "../../components/Post/style.module.css";
import clsx from "clsx";
import { aon } from "~/sdk";
import { useState } from 'react';
import defaultImg from '/other/Upload-Icon.png';
import axios from 'axios';

interface CreatePostModalProps {
    onClose: () => void;
  }

export function CreatePostModal({ onClose }: CreatePostModalProps) {
    const logged = aon.store((x) => x.session?.user);
    const imageProfURL = `http://localhost:8000/api${logged?.profimage}`;
  
  const [caption, setCaption] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('LAME');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [image, setImage] = useState<FormData | null>(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isRemoveIconVisible, setIsRemoveIconVisible] = useState(false);
  const [collaborator, setCollaborator] = useState("");
  const [tag, setTag] = useState("");
  const [nsfw, setNsfw] = useState(false);
  const [nsfwOption, setNsfwOption] = useState("");
  const [remix, setRemix] = useState(false);
  const [remixOption, setRemixOption] = useState("");
  const [boost, setBoost] = useState(false);
  const [boostOption, setBoostOption] = useState("");
  const [share] = useState(false);
  const [visibility, setVisibility] = useState("all");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleVisibilityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setVisibility(event.target.value);
  };

  const handleRemixChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
  
    // Convert the value to a boolean
    const isRemix = value === 'true';
  
    setRemix(isRemix);
    setRemixOption(value);
  };

  const handleNSFWChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
  
    // Convert the value to a boolean
    const isNSFW = value === 'true';
  
    setNsfw(isNSFW);
    setNsfwOption(value);
  };

  const handleBoostChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
  
    // Convert the value to a boolean
    const isBoost = value === 'true';
  
    setBoost(isBoost);
    setBoostOption(value);
  };


  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
  
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setIsImageSelected(true);
  
      const formData = new FormData();
      formData.append('image', file);
  
      setImage(formData);
  
      // Log the FormData object before making the API call
      console.log(formData);
    }
  };

  const handleCreatePost = async () => {
    // Check if there is an image to upload
    if (image) {
      let imagePath;
      try {
        // Upload the image and get the imagePath
        const response = await axios.post('http://localhost:8000/api/images', image, { headers: { 'content-Type': 'multipart/form' } });
        imagePath = response.data.imagePath;
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle the error as needed
      }
  
      // Now you can use the imagePath in your API call
      await aon.createPost({
        user: logged?.displayName || "",
        text: caption,
        slug: logged?.slug || "",
        postimage: imagePath || "", // Use imagePath here
        collaborator: collaborator,
        category: selectedCategory,
        nsfw: nsfw,
        remix: remix,
        profileImage: logged?.profimage || "",
        share: share,
        visibility: visibility,
        boost: boost
      });
    } else {
      await aon.createPost({
        user: logged?.displayName || "",
        text: caption,
        slug: logged?.slug || "",
        postimage: selectedImage || "",
        collaborator: collaborator,
        category: selectedCategory,
        nsfw: nsfw,
        remix: remix,
        profileImage: logged?.profimage || "",
        share: share,
        visibility: visibility,
        boost: boost
      });
    }
    onClose();
  };

  return (
    <MotionBox
      className="fixed top-0 right-0 bottom-0 left-0 bg-[var(--color-createpost)] z-100 overflow-y-auto"
      variants={childVariants({ fade: 1, duration: 0.2 })}
    >
      <style>{`body{overflow:hidden}`}</style>
      <Container 
        size={1000} 
        className="py-4 px-2 rounded-lg mt-40"
        style={{ backgroundColor: 'rgba(34, 43, 54, 0.7)' }}
      >
        <Box className={clsx("flex flex-col space-y-[32px]", styles.post)}>
          <Box className="flex flex-row items-center justify-between space-x-[20px]">
            <Link to={`/profile/${logged?.slug}`}>
              <Avatar src={imageProfURL} size={56} />
            </Link>
            <Box className="flex flex-row items-center justify-between space-x-20px flex-1 <md:flex-col <md:items-stretch <md:space-x-[0px]">
              <Box className="flex flex-row space-x-[20px]">
                <Link to={`/profile/${logged?.slug}`}>
                  <Box className="text-[22px] text-[var(--color-accent)] cursor-pointer <md:text-[18px]">
                    {logged?.displayName}
                  </Box>
                </Link>
              </Box>
            </Box>
          </Box>

          {/* Additional Inputs */}
          <Box
            className="flex flex-col space-y-4 relative"
            onMouseEnter={() => setIsRemoveIconVisible(true)}
            onMouseLeave={() => setIsRemoveIconVisible(false)}
            >
            {!isImageSelected && (
                <label className="cursor-pointer">
                <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                />
                <div className="w-230 h-100 border border-white border-solid rounded-md p-2 cursor-pointer bg-transparent text-white flex items-center justify-center mx-auto ">
                    <img
                        src={defaultImg}
                        alt="Selected"
                        className="mx-auto max-w-[200px] max-h-[200px]"
                    />
                </div>
                </label>
            )}
            {selectedImage && (
                <div className="relative">
                <img
                    src={selectedImage}
                    alt="Selected"
                    className="mx-auto max-w-[960px] max-h-[960px] flex items-center justify-center mx-auto"
                />
                {isRemoveIconVisible && (
                    <Box
                        className="absolute top-0 right-5 p-1 cursor-pointer bg-gray-500 rounded-full"
                        onClick={() => {
                            setSelectedImage(null);
                            setIsImageSelected(false);
                        }}
                    >
                        <XIcon className="w-[20px] h-[20px] text-white" />
                    </Box>
                )}
                </div>
            )}
            <textarea
              placeholder="Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="py-4 px-2 mt-2 bg-transparent border-2 border-white rounded-lg text-white resize-none h-30"
            />
            <input
              placeholder="Collab"
              value={collaborator}
              onChange={(e) => setCollaborator(e.target.value)}
              className="py-2 px-2 mt-2 bg-transparent border-2 border-white rounded-lg text-white resize-none"
            />
            <input
              placeholder="Tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="py-2 px-2 mt-2 bg-transparent border-2 border-white rounded-lg text-white resize-none"
            />
            <div className="flex">
                <select 
                    value={selectedCategory} 
                    onChange={handleCategoryChange}
                    className="py-2 px-5 mt-2 bg-transparent border-2 border-white rounded-lg text-white"
                >
                {/* Options for the first dropdown */}
                    <option className="bg-[var(--color-createpost)]" value="LAME">-- Category --</option>
                    <option className="bg-[var(--color-createpost)]" value="Anime">Anime</option>
                    <option className="bg-[var(--color-createpost)]" value="Photography">Photography</option>
                    <option className="bg-[var(--color-createpost)]" value="Comics">Comics</option>
                    <option className="bg-[var(--color-createpost)]" value="Politics">Politics</option>
                </select>

                {/* Add the second Remix dropdown here */}
                <select 
                    value={remixOption} 
                    onChange={handleRemixChange}
                    className="ml-2 py-2 px-5 mt-2 bg-transparent border-2 border-white rounded-lg text-white"
                >
                {/* Options for the second dropdown */}
                    <option className="bg-[var(--color-createpost)]" value="false">-- Remix --</option>
                    <option className="bg-[var(--color-createpost)]" value="true">Remix - ON</option>
                    <option className="bg-[var(--color-createpost)]" value="Remxi - OFF">Remix - OFF</option>
                {/* Add more options as needed */}
                </select>
                {/* Add the second NSFW dropdown here */}
                <select 
                    value={nsfwOption} 
                    onChange={handleNSFWChange}
                    className="ml-2 py-2 px-5 mt-2 bg-transparent border-2 border-white rounded-lg text-white"
                >
                {/* Options for the second dropdown */}
                    <option className="bg-[var(--color-createpost)]" value="false">-- NSFW --</option>
                    <option className="bg-[var(--color-createpost)]" value="true">NSFW - YES</option>
                    <option className="bg-[var(--color-createpost)]" value="NSFW - NO">NSFW - NO</option>
                {/* Add more options as needed */}
                </select>
                {/* Add the second NSFW dropdown here */}
                <select 
                    value={visibility} 
                    onChange={handleVisibilityChange}
                    className="ml-2 py-2 px-5 mt-2 bg-transparent border-2 border-white rounded-lg text-white"
                >
                {/* Options for the second dropdown */}
                    <option className="bg-[var(--color-createpost)]" value="all">--Visibility: All</option>
                    <option className="bg-[var(--color-createpost)]" value="Followers">Followers</option>
                    <option className="bg-[var(--color-createpost)]" value="Supporters">Supporters</option>
                    <option className="bg-[var(--color-createpost)]" value="Paywall">Paywall</option>
                {/* Add more options as needed */}
                </select>
                {/* Add the second boost dropdown here */}
                <select 
                    value={boostOption} 
                    onChange={handleBoostChange}
                    className="ml-2 py-2 px-5 mt-2 bg-transparent border-2 border-white rounded-lg text-white"
                >
                {/* Options for the second dropdown */}
                    <option className="bg-[var(--color-createpost)]" value="">-- Boost Post --</option>
                    <option className="bg-[var(--color-createpost)]" value="Yes">Boost - Yes</option>
                    <option className="bg-[var(--color-createpost)]" value="No">Boost - No</option>
                {/* Add more options as needed */}
                </select>
            </div>
            <button 
            onClick={handleCreatePost}
            className="ml-auto bg-white border-2 border-white rounded-lg cursor-pointer text-black py-2 w-52 text-sm"
            >
                SHARE NOW
            </button>
          </Box>
        </Box>
      </Container>
      <Box
        className="absolute top-3 right-3 p-1 cursor-pointer rounded-full"
        onClick={onClose}
      >
        <XIcon className="w-[20px] h-[20px] text-white" />
      </Box>
    </MotionBox>
  );
}