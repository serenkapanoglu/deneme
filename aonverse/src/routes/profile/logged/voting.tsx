// VotingRoute.jsx
import { useState } from 'react';
import { useAsync } from 'react-async-hook';
import { Container } from '~/components/Container';
import Poll from '~/components/Poll';
import Sidebar from '~/components/Sidebar';
import { aon } from '~/sdk';
import { Link } from '~/ui';
import PollForm from "../../../../src/modals/CreateVotesModal";

export default function VotingRoute() {
  const logged = aon.store((x) => x.session?.user);// Is this the dummy user or
  const { result: polls } = useAsync(aon.getActivePolls, [], {
    executeOnMount: true,
    executeOnUpdate: false,
  });

  const [isCreateVoteModalOpen, setIsCreateVoteModalOpen] = useState(false);

  const openCreateVoteModal = () => {
    setIsCreateVoteModalOpen(true);
  };

  const closeCreateVoteModal = () => {
    setIsCreateVoteModalOpen(false);
  };

  return (
    <Sidebar side="right" collapsible>
      <Container size={800} className="flex flex-col gap-[40px] py-[40px] px-[20px]">
        {polls?.map((x: any) => (
          <Poll key={x?._id} poll={x} />
        ))}
      </Container>
      <Link
        to={''}
        className={`text-[24px] cursor-pointer hover:opacity-100`}
        onClick={(e) => {
          e.preventDefault();
          openCreateVoteModal();
        }}
      >
        Create New Vote
      </Link>

      <Link to={`/Profile/${logged?._id}/votes`} className={`text-[24px] cursor-pointer hover:opacity-100`}>
        My Votes
      </Link>


       {isCreateVoteModalOpen && (
             <PollForm
         isOpen={isCreateVoteModalOpen}
        onClose={closeCreateVoteModal}
       />
        )}

      
    </Sidebar>
  );
}
