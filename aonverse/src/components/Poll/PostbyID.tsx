import clsx from "clsx";
import { DateTime } from "luxon";
import { Box, Link, Text } from "~/ui";
import { VotingComponent } from "./VotingComponent";
import axios from 'axios';
import React from "react";

const Answer = (props: { answer: PollData["answers"][number] }) => {
  const {
    answer: { text },
  } = props;

  console.log(Answer)

  return (
    <Box
      className={clsx(
        "border-1 border-solid border-[var(--color-text)] rounded-md h-[60px] flex flex-row items-center px-4 cursor-pointer hover:bg-[var(--color-hover)]"
      )}
    >
      {text}
    </Box>
  );
};



export default function Poll(props: { poll: PollData }) {
  const {
    poll: { _id, question, answers, submittedBy, openedAt, closedAt },
  } = props;

  // State for managing answers
  const [currentAnswers, setAnswers] = React.useState(answers);

  // Function to handle voting
  const handleVote = async (field: string, value: number) => {
    try {
      // Optimistic UI update
      const updatedAnswers = currentAnswers.map((answer) =>
        answer.id === field
          ? { ...answer, votes: (answer.votes || 0) + value }
          : answer
      );

      // Update the state to reflect the optimistic UI change
      setAnswers(updatedAnswers);

      // Make an Axios call to update the votes on the server
      const response = await axios.patch(`http://localhost:8000/voiting/${_id}`, {
        _id,
        field, // Update the field name based on your server logic
        value,
      });

      // Handle the response accordingly (if needed)
      console.log('Vote updated successfully:', response.data);
    } catch (error) {
      // Revert the UI update on error
      setAnswers(answers);

      // You can also show an error message to the user
      /*console.error('Error updating vote:', error.response?.data || error.message);*/
    }
  };

  return (
    <Box className="border-1 border-solid border-[var(--color-divider)] p-6 rounded-lg gap-[40px]">
      <Text>{question}</Text>

      {/* Pass the answers array and handleVote function to the VotingComponent */}
      <VotingComponent id={_id} submittedBy={submittedBy} answers={answers} handleVote={handleVote} />


      <Box className="flex flex-row justify-between <md:flex-col gap-[8px]">
        <Text className="text-sm opacity-60">
          Submitted by{" "}
          <Link
            to={`/voiting/${submittedBy}`}
            className="text-[var(--color-accent)]"
          >
            {submittedBy.displayName}
          </Link>
        </Text>
        <Text className="text-sm opacity-60">
          {DateTime.fromISO(openedAt).toLocaleString()} -{" "}
          {DateTime.fromISO(closedAt).toLocaleString()}
        </Text>
      </Box>
    </Box>
  );
}
