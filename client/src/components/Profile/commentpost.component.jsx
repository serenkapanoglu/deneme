import React from 'react';

export const CommentForm = (props) => {
  const [comment, setComment] = React.useState('');
  const [totalComments, setTotalComments] = React.useState(0);

  function handleChange(event) {
    setComment(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Submit the comment to the server
    submitComment(comment);

    // Increment the total number of comments
    setTotalComments(totalComments + 1);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={comment} onChange={handleChange} />
        <button type="submit">Submit Comment</button>
      </form>
      <p>Total comments: {totalComments}</p>
    </div>
  );
}