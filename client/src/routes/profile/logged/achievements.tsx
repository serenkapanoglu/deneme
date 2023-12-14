import './achievements.styles.scss';
import { useAsync } from "react-async-hook";
import { useState, useEffect, useRef } from 'react';
import AvatarFrameItemOverlay from "~/components/AvatarFrameItemOverlay";
import TrophyItem from "~/components/TrophyItem";
import { aon } from "~/sdk";
import { Box, Text } from "~/ui";
import { MotionBox, MotionDivider } from "~/ui/motion";
import { childVariants, parentVariants } from "~/util/motion";
import Searchimg from '../../../ui/assets/search-white.svg';
/*import { ProgressBar } from '../../profile/logged/progressbar.component';*/
//import { ReactComponent as Star } from '../../../../assets/star.svg';
import {Link} from 'react-router-dom';
import Upchart from '../../../ui/assets/chartup.svg';
import Uparrow from '../../../ui/assets/uparrow.svg';
import TrophyModal from "../../../modals/TrophyModal";
/*import axios from 'axios';
import { matchPath, useLocation } from "react-router";*/

interface TrophyGridProps {
  trophies?: TrophyData[];
  title: string;
}

const TrophyGrid: React.FC<TrophyGridProps> = ({ title, trophies }) => {
  const [selectedTrophyId, setSelectedTrophyId] = useState<string | null>(null);
  const [isTrophyModalOpen, setIsTrophyModalOpen] = useState(false);

  const openModal = (trophyId: string) => {
    setIsTrophyModalOpen(true);
    setSelectedTrophyId(trophyId);
  };

  const closeModal = () => {
    setIsTrophyModalOpen(false);
    setSelectedTrophyId(null);
  };

  return (
    <>
      <MotionBox
        className="flex flex-col gap-[40px]"
        variants={parentVariants({ fade: 1 })}
      >
        <Text>{title}</Text>
        <Box className="grid grid-cols-3 gap-[20px] <2xl:grid-cols-2 <xl:grid-cols-1 <lg:grid-cols-2 <md:grid-cols-1">
          {trophies?.map((x) => (
            <TrophyItem key={x.id} trophy={x} openModal={openModal} />
          ))}
        </Box>
      </MotionBox>

      {/* TrophyModal component */}
      {isTrophyModalOpen && selectedTrophyId && (
        <TrophyModal trophyId={selectedTrophyId} onClose={closeModal} />
      )}
    </>
  );
};



export default function AchievementsRoute() {
  //const { crown } = useContext(AchievContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [crowns] = useState<TrophyData[]>([]); // Add TrophyData type here
  const [showResults, setShowResults] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  /*const logged = aon.store((x) => x.session?.user);// Is this the dummy user or*/
  
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
    });*/





  
  const openModal = () => {
    setIsModalOpen(true);
    console.log(isModalOpen);
  };

  /*const closeModal = () => {
    setIsModalOpen(false);
  };*/

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /*const searchListOfCrowns = async (searchTerm: string = '') => {
    try {
      const response = await axios.get(`/crowns`);
      const data = response.data;
  
      const filteredData: TrophyData[] = data.filter((crown: { crown: string }) => {
        const lowercaseCrown = crown.crown.toLowerCase();
        const lowercaseSearchTerm = searchTerm.toLowerCase();
        return lowercaseCrown.includes(lowercaseSearchTerm);
      });
  
      setCrowns(filteredData);
    } catch (error) {
      console.error(error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  };*/
  

  const onInputChange = (e: { target: { value: any; }; }) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
  };

  const resetSearch = () => {
    setSearchTerm('');
    setShowResults(false);
  };
  const searchBoxRef = useRef<HTMLInputElement>(null);

  // ...
  
  const handleClickOutside = (event: { target: any }) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setShowResults(false);
      setSearchTerm('');
    }
  };
  

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);



  const { result: achievements } = useAsync(aon.getAchievements, [], {
    executeOnMount: true,
    executeOnUpdate: false,
  });

  const upChart = Upchart;

  return (
    <MotionBox
    
      className="py-[40px] pr-[100px] flex flex-col gap-[40px] <lg:p-[20px]"
      variants={parentVariants({ fade: 1, stagger: 0.04 })}
    >
      
      <div className='progressbar px-[400px] '>
  
    <img className='achievupchart' src={upChart} alt='' />
    <img className='achievuparrow' src={Uparrow} alt='' />
    

      
      
      </div>
      <MotionBox
      className="flex flex-col gap-[60px]"
      variants={parentVariants({ fade: 1 })}
    >
      <Text>Profile pic</Text>

      <Link to="#" className="text-[var(--color-accent)]">
        <Box className="flex flex-row gap-[20px] flex-wrap">
          <div style={{ position: "relative" }}>

            {/* Render the AvatarFrameItems as overlays */}
            {achievements?.avatarFrames.map((x) => (
              <AvatarFrameItemOverlay
                key={x.id}
                avatarFrame={x}
                onClick={openModal}
              />
            ))}
          </div>
        </Box>
      </Link>
    </MotionBox>

      <MotionDivider variants={childVariants({ fade: 1 })} />

      <TrophyGrid title="Display case" trophies={achievements?.displayCase} />
      
      <MotionDivider variants={childVariants({ fade: 1 })} />
      <div style={{position:'relative', left: 1200, top: 9}}>
                <img src={Searchimg} alt='' style={{width: '2%', position: 'absolute', zIndex: 20, left: 290, top:6 }}/>
                <input ref={searchBoxRef} 
                className='achievheadersearch' 
                value={searchTerm} 
                onChange={onInputChange} 
                //onFocus={handleSearchBoxFocus}
                />
                {showResults && (
                <ul className='achievsearchlist'>
                {searchTerm.length > 0 && crowns && crowns.filter((crown) => crown && crown.crown && crown.crown.includes(searchTerm)).map((crown) => (
                    <li key={crown.id}><Link to={`${crown.crown}`} onClick={()=> {resetSearch();}}>{crown.crown}</Link></li>
                ))}
                </ul>
                )}
            </div>
      <TrophyGrid title="All trophies" trophies={achievements?.allTrophies} />
      
    </MotionBox>
    
  );
}
