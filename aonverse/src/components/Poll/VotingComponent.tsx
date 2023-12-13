import React from 'react';
import {Link } from "~/ui";

type VotingComponentProps = {
  id: string;
  submittedBy: UserData;
  answers: { id: string; text: string; votes?: number }[];
  handleVote: (field: string, value: number) => Promise<void>;
};

export const VotingComponent: React.FC<VotingComponentProps> = ({ id, submittedBy, answers, handleVote }) => {
  console.log('id for vote', id);

  return (
    <div>
      <Link to={`/profile/${submittedBy._id}`} className="text-[var(--color-accent)]">
        {/* Render user profile link */}
      </Link>
      <div className="flex flex-col gap-[20px]">
        {answers.map((x) => (
          <div key={x.id}>
            {/* Render answer */}
            <div>{x.text}</div>
            <div>Votes: {x.votes || 0}</div>
            {/* Voting buttons */}
            {Array.isArray(x.votes) && x.votes.includes(1) && (
              <button onClick={() => handleVote(x.id, 1)}>Upvote</button>
            )}
            {Array.isArray(x.votes) && x.votes.includes(-1) && (
              <button onClick={() => handleVote(x.id, -1)}>Downvote</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
