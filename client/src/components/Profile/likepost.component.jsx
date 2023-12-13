import React, { useState } from 'react';

export const LikeCounter = () => {
  // State to keep track of the number of likes
  const [numLikes, setNumLikes] = useState(0);
  // State to keep track of whether the current user has liked the post
  const [userHasLiked, setUserHasLiked] = useState(false);

  // Event handler for when the user clicks the like button
  const handleLikeClick = () => {
    // If the user has not liked the post, increment the like count and
    // update the state to reflect that the user has liked the post
    if (!userHasLiked) {
      setNumLikes(numLikes + 1);
      setUserHasLiked(true);
    }
  };

  return (
    <div>
      <button onClick={handleLikeClick}>
        {userHasLiked ? 'Unlike' : 'Like'}
      </button>
      <p>{numLikes} likes</p>
    </div>
  );
};