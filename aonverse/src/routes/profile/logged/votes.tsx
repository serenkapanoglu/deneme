// VotingRoute.jsx
import { useAsync } from 'react-async-hook';
import { Container } from '~/components/Container';
import Poll from '~/components/Poll';
import Sidebar from '~/components/Sidebar';
import { aon } from '~/sdk';
import axios from 'axios';


const handleDeletePoll = async (pollId: String) => {
  try {
    // Make an Axios call to delete the poll with the given id
    await axios.delete(`/votes/${pollId}`);
    // You may want to refresh the polls after successful deletion
    // You can refetch the polls or update the state accordingly
  } catch (error) {
    console.error('Error deleting poll:', error.response?.data || error.message);
  }
};

export default function VotesRoute() {
  const logged = aon.store((x) => x.session?.user);
  const { result: polls } = useAsync(() => aon.getPollById(logged?._id|| ''), [], {
    executeOnMount: true,
    executeOnUpdate: false,
  });


  return (
    <Sidebar side="right" collapsible>
      <Container size={800} className="flex flex-col gap-[40px] py-[40px] px-[20px]">
        {polls?.map((x: any) => (
          <Poll key={x?._id} poll={x} onDelete={handleDeletePoll(x?._id)} />
        ))}
      </Container>
    </Sidebar>
  );
}
