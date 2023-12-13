import React from "react";
import styled from "styled-components";
import Grid from '@mui/material/Grid'; // Grid version 1
//import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import { JoinList } from './JoinList-component';
import OurVisionLogo from './img/ourvision.png';
import { SignUpList } from "./SignUpList-component";


const Container = styled.div`
  display: flex;
  height: 80%;
  background-color: ${(props) => props.theme.colors.bgDefault};
  @media only screen and (max-width: 600px) {
    height: 60%;
  }
  @media only screen and (min-width: 600px) {
    height: 50%;
  }
  @media only screen and (min-width: 992px) {
    height: 80%;
  }
`;

const ContainerB = styled.div`
  display: flex;
  height: 20%;
  padding-top: 50px;
  @media only screen and (max-width: 600px) {
    height: 60%;
  }
  @media only screen and (min-width: 600px) {
    height: 50%;
  }
  @media only screen and (min-width: 992px) {
    height: 20%;
  }
`;
const Right = styled.div`
  width: 60%;
  background-color: ${(props) => props.theme.colors.bgDefault};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 600px) {
    width: 50%;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
  @media only screen and (min-width: 992px) {
    width: 60%;
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
const Description = styled.p`
  width: 70%;
  font-size: 20px;
  margin-bottom: 2%;
  color: ${(props) => props.theme.colors.textDark};
  //for Mobiles
  @media only screen and (max-width: 600px) {
    width: 80%;

  }
  //for Tablets and Medium Screens
  @media only screen and (min-width: 600px) {
    width: 70%;
  }
  //for laptops and desktops
  @media only screen and (min-width: 992px) {
    width: 70%;
  }
`;
const DescriptionB = styled.p`
  width: 70%;
  font-size: 20px;
  margin-bottom: 2%;
  padding-left: 250px;
  color: ${(props) => props.theme.colors.textDark};
  //for Mobiles
  @media only screen and (max-width: 600px) {
    width: 80%;

  }
  //for Tablets and Medium Screens
  @media only screen and (min-width: 600px) {
    width: 70%;
  }
  //for laptops and desktops
  @media only screen and (min-width: 992px) {
    width: 70%;
  }
`;
const Center = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  padding-left: 100px;
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

const Left = styled.div`
  width: 40%;
  background-color: ${(props) => props.theme.colors.bgDefault};
  display: flex;
  align-items: center;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const Image = styled.img`
  width: 500px;
  background-color: ${(props) => props.theme.colors.bgDefault};
  @media only screen and (min-width: 600px) {
    width: 400px;
  }
  @media only screen and (min-width: 992px) {
    width: 500px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
`;
const Button = styled.button`
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.text};
  margin-left: 5px;
  padding: 15px 30px;
  cursor: pointer;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 10px;
  background: linear-gradient(
    to right,
    ${(props) => props.theme.colors.bgLight} 50%,
    ${(props) => props.theme.colors.bgSecondary} 50%
  );
  background-size: 200% 100%;
  background-position: right bottom;
  transition: all 0.5s ease-out;
  &:hover {
    color: ${(props) => props.theme.colors.bgPrimary};
    border: 2px solid ${(props) => props.theme.colors.primary};
    background-position: left bottom;
    cursor: pointer;
  }
  //for Mobiles
  @media only screen and (max-width: 600px) {
    padding: 10px 25px;
  }
  //for Tablets and Medium Screens
  @media only screen and (min-width: 600px) {
    padding: 10px 30px;
  }
  //for laptops and desktops
  @media only screen and (min-width: 992px) {
    padding: 15px 30px;
  }
`;


export const BoxContainerA = styled.div`
    width: 1200px;
    min-height: 300px;
`;


const TextContainer = styled.div`

`;

const AppContainer = styled.div`
  width: 100%;

  `;

  const Item = styled.div`
  `;

const BtnContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-bottom: 150px;
    z-index: 1;
`;

export function OurVision() {

        return(
            <AppContainer>
    <Container>
      <Left>
      <Image src={OurVisionLogo} />
      </Left>{" "}
      <Right>
      <Title>OUR Vision</Title>
        <Description>
        Curiously, the pursuance of project architecture instantaneously differentiates the system concepts and 
        The Innovation of Basic Rate (Ezequiel Rendon in The Book of the Functional Programming)  As a resultant
        implication, dimensions of the independent knowledge provides rich insights into the independent knowledge.
        Therefore, the concept of the system concepts can be treated as the only solution.  

        Curiously, the pursuance of project architecture instantaneously differentiates the system concepts and The 
        Innovation of Basic Rate (Ezequiel Rendon in The Book of the Functional Programming)  As a resultant implication, 
        dimensions of the independent knowledge provides rich insights into the independent knowledge. Therefore, the concept
         of the system concepts can be treated as the only solution. 
        </Description>
      </Right>

    </Container>
    <ContainerB>
    <Center>
    <Title>Join The Team</Title>
        <DescriptionB>
        Curiously, the pursuance of project architecture instantaneously differentiates the system concepts and 
        The Innovation of Basic Rate (Ezequiel Rendon in The Book of the Functional Programming)  As a resultant
        implication, dimensions of the independent knowledge provides rich insights into the independent knowledge.
        Therefore, the concept of the system concepts can be treated as the only solution.  
        </DescriptionB>
        <BtnContainer>
                        <SignUpList />
                    </BtnContainer>
      </Center>
      </ContainerB>

            </AppContainer>
        )

    }