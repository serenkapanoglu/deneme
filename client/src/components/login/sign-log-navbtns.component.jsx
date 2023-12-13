import { Link } from 'react-router-dom';
import { UniversHeader } from './aonverseheader';
import styled from 'styled-components';

const BoxContainerA = styled.div`
    width: 700px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    border-radius: 19px;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
    position: relative;
    overflow: hidden;
    z-index: 1;
`;

const BtnContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    padding-bottom: 150px;
    column-gap: 40px;
    z-index: 10;
`;

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  `;

const myStyle={
  backgroundImage: "url(/img/univers.png)",
  height:'100vh',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100%'
};

export const NavBtns= () => {
    return (
      <div style={myStyle}>
        <AppContainer>
          <BoxContainerA>
            <UniversHeader />
          <BtnContainer>
            <Link type="button" className="btn btn-outline-light" to='/login'>
              Sign In
            </Link>
            <Link type="button" className="btn btn-outline-light" to='/signup'>
              Sign Up
            </Link>
          </BtnContainer>
          </BoxContainerA>
        </AppContainer>
      </div>
    );
  };