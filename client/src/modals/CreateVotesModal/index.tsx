import { Box, Link, Avatar } from "~/ui";
import { MotionBox } from "~/ui/motion";
import { XIcon } from "~/util/icons";
import { childVariants } from "~/util/motion";
import { Container } from "~/components/Container";
import styles from "../../components/Post/style.module.css";
import clsx from "clsx";
import { aon } from "~/sdk";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DateTime } from "luxon";

// Assuming PollData and UserData types are available

interface PollFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: PollData; // Pass existing poll data as initialData prop
}

const PollForm: React.FC<PollFormProps> = ({ initialData, onClose }) => {
    const logged = aon.store((x) => x.session?.user);
    const imageProfURL = `http://localhost:8000/api${logged?.profimage}`;
  
  const [caption, setCaption] = useState('');
  const [collaborator, setCollaborator] = useState("");
  const [tag, setTag] = useState("");
  const [question, setQuestion] = useState('');



  
  const [formData, setFormData] = useState<PollData>({
    _id: '',
    question: '',
    answers: [
      { id: '0', text: '', votes: 0 },
      { id: '1', text: '', votes: 0 },
    ],
    submittedBy: {
      _id: '',
      displayName: '',
      displayTut: false,
      title: '',
      postTut: false,
      bio: '',
      bioTut: false,
      qrcode: '',
      profImageTut: false,
      backImageTut: false,
      tutcomplete: false,
      tutview: false,
      stars: 0,
      slug: '',
      achievements: [],
      displayCase: [],
      following: [],
      supporting: [],
      followers: [],
      supporters: [],
      consecutivelogins: 0,
      active: false,
      NSFW: false,
      tagFollowing: [],
      lastlogin: '',
      profimage: '',
      email: '',
      backimage: ''
    },
    openedAt: '',
    closedAt: '',
    myVote: {
      answerId: '',
      stars: 0,
    },
  });

  
  useEffect(() => {
    // Merge the initialData into formData when it changes
    if (initialData) {
      setFormData(initialData);
        
    }
  }, [initialData]);


  const handleSave = async () => {
    const durationInMillis = 1000000; // Adjust this value as needed
    try {
      // Update submittedBy with user data from logged if available
      setFormData((prevData) => {
        const updatedData = {
          ...prevData,
          question:question,
          submittedBy: logged,
          openedAt: DateTime.local().toISO(),
          closedAt: DateTime.local().plus({ milliseconds: durationInMillis }).toISO(),

        };
  
        // Log the updated state after it's set
        console.log('Poll Data:', updatedData);
  
        return updatedData;
      });
  
      const user = logged || {};
  
      // Assuming you have the API endpoint and data structure for saving a new poll
      const response = await axios.post('http://localhost:8000/voiting/create', {
        ...formData,
        submittedBy: logged ? user : null,
        openedAt: DateTime.local().toISO(),
      });
  
      // Handle the response (if needed)
      console.log('Poll saved successfully:', response.data);
  
  
    } catch (error) {
      // Handle errors, show an error message, etc.
      console.error('Error saving poll:', error.response?.data || error.message);
    }
  };
  
  
  
  

  const handleAnswerChange = (index: number, value: string) => {
    // Create a new array to avoid mutating state directly
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index] = { id: index.toString(), text: value , votes:0};

    // Update formData with the new answers array
    setFormData((prevData) => ({
      ...prevData,
      answers: updatedAnswers,
    }));
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

          <Box
            className="flex flex-col space-y-4 relative"
            >

    <div>
    
              <textarea
              placeholder="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="py-4 px-2 mt-2 bg-transparent border-2 border-white rounded-lg text-white resize-none h-30"
            />
              <br></br>
              {formData.answers.map((answer, index) => (
              <textarea
              placeholder="Vote Options"
              name={`answer${index + 1}`}
              value={answer?.text || ''}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="py-4 px-2 mt-2 bg-transparent border-2 border-white rounded-lg text-white resize-none h-30"
            />
            ))}

            </div>
            
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
            <button 
            onClick={handleSave}
            className="ml-auto bg-white border-2 border-white rounded-lg cursor-pointer text-black py-2 w-52 text-sm"
            >
                Create Vote
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

export default PollForm;