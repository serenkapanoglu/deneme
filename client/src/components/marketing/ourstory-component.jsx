import React from "react";
import styled from "styled-components";
import Grid from '@mui/material/Grid'; // Grid version 1
//import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import { JoinList } from './JoinList-component';
import AboutLogo from './img/aboutuslogo.png';


const Container = styled.div`
  display: flex;
  height: 90%;
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
    text-align: center;
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
  width: 700px;
  background-color: ${(props) => props.theme.colors.bgDefault};
  @media only screen and (min-width: 600px) {
    width: 400px;
  }
  @media only screen and (min-width: 992px) {
    width: 700px;
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
  height: 100%;
  `;

  const Item = styled.div`
  `;



export function OurStory() {

        return(
            <AppContainer>
    <Container>
      <Left>
      <Image src={AboutLogo} />
      </Left>{" "}
      <Right>
      <Title>OUR STORY</Title>
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
            </AppContainer>
        )

    }
