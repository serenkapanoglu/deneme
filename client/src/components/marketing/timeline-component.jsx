import styled from "styled-components";
import Grid from "@mui/material/Grid"; // Grid version 1
//import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import { JoinList } from "./JoinList-component";
import timeline from "./img/timelinefill.png";
import { SignUpList } from "./SignUpList-component";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
//import colorSharp2 from "~/assets/img/color-sharp2.png";
import "animate.css";
import TrackVisibility from "react-on-screen";

/*

const Container = styled.div`
  display: flex;
  height: 90%;
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
*/

const Left = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 150px;
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

const Right = styled.div`
  width: 40%;
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

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  padding-bottom: 150px;
  column-gap: 40px;
  z-index: 10;
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

const TextContainer = styled.div``;

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Item = styled.div``;
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

export function Timeline() {
  /*
        return(
            <AppContainer>
            <Container>
            <Center>
                    <Title>TIMELINE</Title>
                    <Image src={timeline} />
            </Center>
                     
            </Container>
                    </AppContainer>
        )
*/

  return (
    <section className="project" id="project">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Timeline</h2>

                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav
                      variant="pills"
                      className="nav-pills mb-5 justify-content-center align-items-center"
                      id="pills-tab"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="first">Building</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Alpha</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Beta</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content
                      id="slideInUp"
                      className={
                        isVisible ? "animate__animated animate__slideInUp" : ""
                      }
                    >
                      <Tab.Pane eventKey="first">
                        <p>
                          Curiously, the pursuance of project architecture
                          instantaneously differentiates the system concepts and
                          The Innovation of Basic Rate (Ezequiel Rendon in The
                          Book of the Functional Programming) As a resultant
                          implication, dimensions of the independent knowledge
                          provides rich insights into the independent knowledge.
                          Therefore, the concept of the system concepts can be
                          treated as the only solution.
                        </p>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <p>
                          Curiously, the pursuance of project architecture
                          instantaneously differentiates the system concepts and
                          The Innovation of Basic Rate (Ezequiel Rendon in The
                          Book of the Functional Programming) As a resultant
                          implication, dimensions of the independent knowledge
                          provides rich insights into the independent knowledge.
                          Therefore, the concept of the system concepts can be
                          treated as the only solution.
                        </p>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <p>
                          Curiously, the pursuance of project architecture
                          instantaneously differentiates the system concepts and
                          The Innovation of Basic Rate (Ezequiel Rendon in The
                          Book of the Functional Programming) As a resultant
                          implication, dimensions of the independent knowledge
                          provides rich insights into the independent knowledge.
                          Therefore, the concept of the system concepts can be
                          treated as the only solution.
                        </p>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
