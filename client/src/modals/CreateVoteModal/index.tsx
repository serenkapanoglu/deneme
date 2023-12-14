import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { aon } from "~/sdk";
import { DateTime } from 'luxon';
/*import { matchPath, useLocation } from "react-router";
import { useAsync } from 'react-async-hook';*/

// Assuming PollData and UserData types are available

interface PollFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: PollData; // Pass existing poll data as initialData prop
}

const PollForm2: React.FC<PollFormProps> = ({ initialData, isOpen, onClose }) => {
  const logged = aon.store((x) => x.session?.user);// Is this the dummy user or
  
  /*const location = useLocation();

  const profileMatch = matchPath(`/profile/:id`, location.pathname);
  const loggedMatch =
    matchPath(`/profile/${logged?._id}`, location.pathname) ||
    matchPath(`/profile/${logged?._id}/*`, location.pathname);

  const showsHeader = matchPath(`/profile/:id`, location.pathname);

  const followers = logged?.followers?.length || 0;
  const supporters = logged?.supporters?.length || 0;

  const { result: user } = useAsync(
    aon.getUser,
    [profileMatch?.params.id || ""],
    { 
      executeOnMount: true,
      executeOnUpdate: true,
    }
  );*/

  
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
    try {
      // Update submittedBy with user data from logged if available
      const user = logged || {};
  
      // Assuming you have the API endpoint and data structure for saving a new poll
      console.log('Poll Data:', formData);
      const response = await axios.post('/votes', {
        ...formData,
        submittedBy: logged ? user : null, // Use user if logged is defined, otherwise set to null
        openedAt: DateTime.local().toISO(), // Set openedAt to the current time as an ISO string
      });
  
      // Handle the response (if needed)
      console.log('Poll saved successfully:', response.data);
  
      // Reset the form or perform any other necessary actions
      /*setFormData((prevData) => {
        return {
          ...prevData,
          answers: [], // Clear answers array
          submittedBy: logged ? user : null, // Update submittedBy based on the condition
        };
      });*/
    } catch (error) {
      // Handle errors, show an error message, etc.
      /*console.error('Error saving poll:', error.response?.data || error.message);*/
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


  return isOpen? (
    <div>
      <br></br>
      <label>
        Question:
        <input
          type="text"
          name="question"
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
        />
      </label>
      <br></br>
      {formData.answers.map((answer, index) => (
        <label key={index}>
          Answer Option {index + 1}:
          <input
            type="text"
            name={`answer${index + 1}`}
            value={answer?.text || ''}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
          <br></br>
        </label>
        
      ))}
      <br></br>
      {/* Save or submit button */}
      <button onClick={() => { handleSave(); setFormData((prevData) => ({ ...prevData, answers: [] })); onClose(); }}>Save</button>
      <br></br>
    </div>
  ):null
};

export default PollForm2;
