import styled from "styled-components";
import footerlogo from './img/freedomlogo.png';
import { Pleb } from './Pleb-component';
import { SignUpList } from "./SignUpList-component";


export const BoxContainerA = styled.div`
    width: 1200px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    border-radius: 19px;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
    position: relative;
    overflow: hidden;
    z-index: 1;
`;


const WelcomeContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    margin-bottom: 50px;
    z-index: 10;
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

export const FormContainer = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    `;

export function UniversFooter() {

        return(
            <AppContainer>
                <BoxContainerA>
                    <WelcomeContainer>
                        <img alt="footer" src={footerlogo} />
                    </WelcomeContainer>
                    <BtnContainer>
                        <SignUpList />
                        <Pleb />
                    </BtnContainer>
                </BoxContainerA>
            </AppContainer>
        )

    }