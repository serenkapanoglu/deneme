import React from "react";
import { useAsync } from "react-async-hook";
import { useNavigate } from "react-router-dom";
import { Container } from "~/components/Container";
import TrophyItem from "~/components/TrophyItem";
import { aon } from "~/sdk";
import { Box } from "~/ui";
import { MotionBox } from "~/ui/motion";
import { XIcon } from "~/util/icons";
import { childVariants } from "~/util/motion";

interface TrophyModalProps {
  trophyId: string;
  onClose: () => void;
}

const TrophyModal: React.FC<TrophyModalProps> = ({ trophyId, onClose }) => {
  const navigate = useNavigate();

  // Fetch the trophy data based on the id from the URL parameters
  const fetcher = useAsync(() => aon.getTrophyById(trophyId || ""), [trophyId]);

  return (
    <MotionBox
      className="fixed top-50% left-50% transform translate(-50%, -50%) bg-[var(--color-modal)] z-100 overflow-y-auto scale-400"
      variants={childVariants({ fade: 1, duration: 0.2 })}
    >
      {/* ... other components ... */}
      <Container size={1000} className="py-[200px] px-[200px] scale-100">
        {/* Render the TrophyItem component with the fetched trophy data */}
        {fetcher.result && (
          <TrophyItem trophy={fetcher.result.Trophy[0]} openModal={() => {}} />
        )}
      </Container>
      <Box
        className="fixed top-[550px] right-[475px] p-[6px] rounded-full cursor-pointer hover:bg-[var(--color-hover)] w-[60px] h-[60px] flex flex-row items-center justify-center scale-200"
        onClick={() => {
          // Navigate back to the same page, using the id parameter
          navigate(0);
          // Call the onClose function if provided
          onClose && onClose();
        }}
      >
        <XIcon className=" w-[30px] h-[30px] text-white" />
      </Box>
    </MotionBox>
  );
};
export default TrophyModal;
