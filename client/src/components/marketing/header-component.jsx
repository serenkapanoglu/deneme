import React from 'react';
import styled from "styled-components";
import logo from './img/universlogolarge.png';
import universcopy from './img/universtext.png';
import welcome from './img/welcomelogo.png';
import { JoinList } from './JoinList-component';
import { LearnMore } from './LearnMore-component';


export const BoxContainerA = styled.div`
    width: 1200px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
    position: relative;
    margin-top: 250 px;
    overflow: hidden;
    z-index: 1;
    padding-top: 150px;
`;
export const BoxContainerB = styled.div`
    width: 1500px;
    min-height: 300px;
    border-radius: 19px;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
    position: relative;
    overflow: hidden;
    z-index: 1;
`;

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    z-index: 10;
`;
const HeaderItems = styled.div`
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    margin-left: 10 px;
    z-index: 10;
`;

const HeaderItems2 = styled.div`
    width: 60%;
    display: flex;
    flex-direction: row;
    align-items: right;
    justify-content: right;
    margin-top: auto;
    z-index: 10;
`;
const WelcomeContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    margin-left: 100 px;
    margin-bottom: 50px;
    z-index: 10;
`;
const BtnContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 50px;
    margin-top: 200 px;
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

 const Center = styled.div`
 display: flex;
 flex: 1;
 justify-content: center;
 flex-direction: column;
 padding-left: 100px;
 padding-top: 50px;
 margin-top: 100px;
 background-color: ${(props) => props.theme.colors.bgDefault};
 //for Mobiles
 @media only screen and (max-width: 600px) {
   display: none;
 }
 //for Tablets and Medium Screens
 @media only screen and (min-width: 600px) {
   display: flex;
 }
 //for laptops and desktops
 @media only screen and (min-width: 992px) {
   display: flex;
 }
`;


const Title = styled.div`
  width: 60%;
  font-size: 40px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  //for Mobiles
  @media only screen and (max-width: 600px) {
    width: 100%;
    font-size: 30px;
  }
  //for Tablets and Medium Screens
  @media only screen and (min-width: 600px) {
    width: 85%;
    font-size: 30px;
  }
  //for laptops and desktops
  @media only screen and (min-width: 992px) {
    width: 85%;
  }
`;
const DescriptionB = styled.p`
  width: 90%;
  font-size: 20px;
  margin-bottom: 2%;
  padding-left: 75px;
  color: ${(props) => props.theme.colors.textDark};
  //for Mobiles
  @media only screen and (max-width: 600px) {
    width: 90%;

  }
  //for Tablets and Medium Screens
  @media only screen and (min-width: 600px) {
    width: 80%;
  }
  //for laptops and desktops
  @media only screen and (min-width: 992px) {
    width: 90%;
  }
`;

export function MarketingHeader() {

        return(
            <div>
                
            <AppContainer>
            
                <BoxContainerA>
                    <WelcomeContainer>
                        <img alt="welcome" src={welcome} />
                    </WelcomeContainer>
                    <HeaderContainer>
                        <HeaderItems>
                        <img alt="logo" src={logo} />
                        </HeaderItems>
                        <HeaderItems2>
                        <img alt="copy" src={universcopy} />
                        </HeaderItems2>
                    </HeaderContainer>
                    <BtnContainer>
                        <JoinList />
                        <LearnMore />
                    </BtnContainer>
                    <Center>
                    <Title>UNIVERSE IS AN APP DESIGNED TO PROTECT YOUR PRIVACY</Title>
                     <DescriptionB>
                     Curiously, the pursuance of project architecture instantaneously differentiates the system concepts and 
                     The Innovation of Basic Rate (Ezequiel Rendon in The Book of the Functional Programming)  As a resultant
                     implication, dimensions of the independent knowledge provides rich insights into the independent knowledge.
                     Therefore, the concept of the system concepts can be treated as the only solution.  
                    </DescriptionB>
                     </Center>
                </BoxContainerA>
                
            </AppContainer>
     


            </div>
        )

    }