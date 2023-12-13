import { useNavigate } from 'react-router-dom';
import './votingpage.styles.scss';

export const VotingPage = () => {
    const navigate = useNavigate();
    const navLayout = async () => {
        navigate('/userprofile/layout')
    };

    const navAchiev = async () => {
        navigate('/userprofile/achievements')
    };

    const navProfile = async () => {
        navigate('/userprofile')
    };

    return (
        <div className='achievebackground'>
            <div className='pagenav'>
                <button className='pagenavoption' onClick={navProfile}>PROFILE</button>
                <button className='pagenavoption' onClick={navAchiev}>ACHIEVMENTS</button>
                <button className='pagenavoption' onClick={navLayout}>LAYOUTS</button>
                <button className='pagenavoption'>VOTING</button>
            </div>
            <div style={{display: 'flex', marginTop: 75, marginLeft: 200}}>
                <span style={{display: 'flex', color: 'white', fontSize: 20}}>NEW FEATURES</span>
                <div style={{display: 'flex', flexDirection: 'column', marginTop: 40}}>
                    <div className='votetopiccontainer'>
                        <span style={{color: 'white', marginLeft: 30, paddingTop: 10, fontSize: 20}}>1. Should Aonverse allow users to create and remix images using AI?</span>
                        <span style={{marginLeft: 30, marginTop: 30, fontSize: 13, color: 'white', display: 'flex'}}>SUBMITTED BY <a href="" style={{paddingLeft: 5, paddingRight: 5}}>STAUFFERA12</a> OPENED 12/14/2022 - CLOSES 1/14/2022</span>
                        <button style={{textAlign: 'left', marginTop: 30, marginLeft: 30, background: 'none', color: 'white', height: 60, borderColor: 'grey', borderRadius: 10, width: '80%'}}><span style={{paddingTop: 10}}>Yes, AI is the future!</span></button>
                        <button style={{textAlign: 'left', marginTop: 30, marginLeft: 30, background: 'none', color: 'white', height: 60, borderColor: 'grey', borderRadius: 10, width: '80%'}}><span style={{paddingTop: 10}}>No, AI will destroy us all!</span></button>
                    </div>
                    <div className='votetopiccontainer'>
                        <span style={{color: 'white', marginLeft: 30, paddingTop: 10, fontSize: 20}}>2. The cursed 'Dislike' button, do we add it?</span>
                        <span style={{marginLeft: 30, marginTop: 30, fontSize: 13, color: 'white', display: 'flex'}}>SUBMITTED BY <a href="" style={{paddingLeft: 5, paddingRight: 5}}>Darrien C</a> OPENED 11/14/2022 - CLOSES 2/01/2022</span>
                        <button style={{textAlign: 'left', marginTop: 30, marginLeft: 30, background: 'none', color: 'white', height: 60, borderColor: 'grey', borderRadius: 10, width: '80%'}}><span style={{paddingTop: 10}}>Yes, disincentivies poor or harmful conent</span></button>
                        <button style={{textAlign: 'left', marginTop: 30, marginLeft: 30, background: 'none', color: 'white', height: 60, borderColor: 'grey', borderRadius: 10, width: '80%'}}><span style={{paddingTop: 10}}>No, this creates a toxic enviornment</span></button>
                    </div>
                    <div className='votetopiccontainer'>
                        <span style={{color: 'white', marginLeft: 30, paddingTop: 10, fontSize: 20}}>3. Is 6" average?</span>
                        <span style={{marginLeft: 30, marginTop: 30, fontSize: 13, color: 'white', display: 'flex'}}>SUBMITTED BY <a href="" style={{paddingLeft: 5, paddingRight: 5}}>Spumoni</a> OPENED 09/14/2022 - CLOSES 3/14/2022</span>
                        <button style={{textAlign: 'left', marginTop: 30, marginLeft: 30, background: 'none', color: 'white', height: 60, borderColor: 'grey', borderRadius: 10, width: '80%'}}><span style={{paddingTop: 10}}>Yes, my girlfriend says so!</span></button>
                        <button style={{textAlign: 'left', marginTop: 30, marginLeft: 30, background: 'none', color: 'white', height: 60, borderColor: 'grey', borderRadius: 10, width: '80%'}}><span style={{paddingTop: 10}}>No, Mr. Micro</span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}