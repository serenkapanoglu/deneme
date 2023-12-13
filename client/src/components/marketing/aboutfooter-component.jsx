import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  color: white;
  width: 100%;
  margin-top: 5%;
  height: 100%;
  //for Mobiles
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
  //for Tablets and Medium Screens
  @media only screen and (min-width: 600px) {
    height: 100%;
  }
  //for laptops and desktops
  @media only screen and (min-width: 992px) {
    height: 100%;
  }
`;

const Title = styled.div`
  color: white;
  font-weight: bold;
  font-size: 20px;
  padding: 2%;
`;
const Description = styled.div`
  color: gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  width: 30%;
  //for Mobiles
  @media only screen and (max-width: 600px) {
    width: 100%;
    text-align: center;
    font-size: 15px;
    padding: 2%;
  }
  //for Tablets and Medium Screens
  @media only screen and (min-width: 600px) {
    width: 40%;
    font-size: 18px;
    text-align: center;
  }
  //for laptops and desktops
  @media only screen and (min-width: 992px) {
    width: 30%;
    font-size: 20px;
    text-align: center;
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  list-style: none;
`;
const MenuItem = styled.li`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
  margin-right: 30px;
  color: ${(props) => props.theme.colors.textDark};
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const MenuItems = styled.div`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
  color: gray;
  cursor: pointer;
`;

const CopyRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  background-color: gray;
  color: white;
  font-size: 20px;
`;


export function AboutFooter() {

        return(
            <>
            <Container>
              <Description>
                <Title>About Us</Title>
                Curiously, the pursuance of project architecture instantaneously differentiates the system concepts and 
                The Innovation of Basic Rate (Ezequiel Rendon in The Book of the Functional Programming)  As a resultant
                implication, dimensions of the independent knowledge provides rich insights into the independent knowledge.
                Therefore, the concept of the system concepts can be treated as the only solution.  
        
              </Description>
              <MenuItems>
                <Title>Our Services</Title>
                <Menu>
                  <MenuItem href="#">Training Courses</MenuItem>
                  <MenuItem href="#">Service Desk</MenuItem>
                  <MenuItem href="#">Proactive Services</MenuItem>
                  <MenuItem href="#">User Support</MenuItem>
                  <MenuItem href="#">24/7 Services</MenuItem>
                </Menu>
              </MenuItems>
              <MenuItems>
                <Title>Our Policies</Title>
                <Menu>
                  <MenuItem href="#">Privacy Policy</MenuItem>
                  <MenuItem href="#">Data Policy</MenuItem>
                </Menu>
              </MenuItems>
            </Container>
      
            <CopyRight>&copy; 2022 UNIVERS - All Rights Reserved.</CopyRight>
          </>
        )

    }