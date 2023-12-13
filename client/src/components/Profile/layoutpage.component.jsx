import { useNavigate } from 'react-router-dom';
import { CrownAchievements } from './crownachievments.component';
import { ProgressBar } from './progressbar.component';

export const LayoutPage = () => {
    const navigate = useNavigate();
    const navVoting = async () => {
        navigate('/userprofile/voting')
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
                <button className='pagenavoption'>LAYOUTS</button>
                <button className='pagenavoption' onClick={navVoting}>VOTING</button>
            </div>
            <div className='achievecontainer'>
            <CrownAchievements /><span style={{marginTop: 8, paddingLeft: 10}}>X</span><span style={{paddingLeft: 10, paddingRight: 10, marginTop: 4, fontSize: 20}}>0</span><ProgressBar value={50} />
        </div>
        </div>
    )
}