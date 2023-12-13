import './reportbugpage.styles.scss';

export const ReportBugPage = () => {
    return (
        <div className='reportbugpage'>
            <div className='reportbugcontent'>
                <span className='reportabugtitle'>REPORT A BUG</span>
                <span className='reportabugsubtitle'>Tell us what we can do to improve</span>
                <h5 className='reportabugemailsubtitle'>EMAIL</h5>
                <input type='email' className='reportbugemailbox'></input>
                <h5 className='reportabugtextsubtitle'>WHAT IS THE BUG?</h5>
                <textarea className='reportbugtextbox'></textarea>
                <button className="btn btn-outline-light" style={{width: '10%'}}>SUBMIT</button>
            </div>
        </div>
    )
};