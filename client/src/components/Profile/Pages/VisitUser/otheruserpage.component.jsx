import './otheruserpage.styles.scss';
import { OtherUserProfileHeader } from './otheruser-headdisplay.component';
import { DonateSupportButtons } from './donatesupport.component';
import { OtherUserBio } from './biosection.component';

export const OtherUser = () => {
    return (
        <div className='otheruserpage'>
            <OtherUserProfileHeader />
                <DonateSupportButtons />
                <OtherUserBio />
        </div>
    )
}