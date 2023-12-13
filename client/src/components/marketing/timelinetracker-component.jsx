import styled from "styled-components";
import { MiniFooter } from "./minifooter-component";
import { TimelineHeader } from './timelineheader-component';
import { TimelineBody } from './timelinebody-component';
import { Donation } from './donation-component';
import { useState } from "react";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "styled-components";
import AboutNavbar from "./navbar/AboutNavbar-component";


const GlobalStyles = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
}
body{
  background-color: ${(porps) => porps.theme.colors.bgDefault};
  @import url("https://fonts.googleapis.com/css2?family=Splash&display=swap");
  *{
    font-family: 'Roboto', sans-serif;
  }
}
`;

const Container = styled.div`
  background-color: white;
  height: 100vh;
`;

const theme = {
  colors: {
    primary: "darkBlue",
    secondary: "tomato",
    light: "black",
    text: "snow",
    textDark: "gray",
    bgDefault: "white",
    bgPrimary: "darkBlue",
    bgSecondary: "darkBlue",
    bgLight: "aliceBlue",
    hoverColor: "aliceBlue",
  },
};

const darktheme = {
  colors: {
    primary: "white",
    secondary: "tomato",
    light: "yellow",
    text: "snow",
    textDark: "gray",
    bgDefault: "black",
    bgPrimary: "black",
    bgSecondary: "black",
    bgLight: "aliceBlue",
    hoverColor: "",
  },
};


const topHeader={
    backgroundImage: "url(/img/univers.png)",
    height:'75vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};

const timeline={
  backgroundImage: "url(/img/univers.png)",
  height:'500vh',
  backgroundSize: 'contain',
  backgroundRepeat: 'repeat',
};
const ourStory={
    backgroundImage: "url(/img/purplebox.png)",
    height:'100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};
const ourTeam={
    backgroundImage: "url(/img/purplebox.png)",
    height:'60vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};

const spotlight={
    backgroundImage: "url(/img/spotlight.png)",
    height:'100vh',
    backgroundSize: 'auto',
    backgroundRepeat: 'no-repeat',
};

const ourvision={
    backgroundImage: "url(/img/purplebox.png)",
    height:'100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};


const footer={
    backgroundImage: "url(/img/bluebox.png)",
    height:'50vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};
export function TimelineView() {
    const [mode, setMode] = useState(false);
    return(  
        <ThemeProvider theme={mode ? theme : darktheme}>
        <GlobalStyles />
        <Container>
        <div>
        <AboutNavbar setMode={setMode} mode={mode} />
            <div style={ topHeader }><TimelineHeader /></div>
            <div style={ timeline }><TimelineBody /></div>
            <div style={ footer }><MiniFooter /></div>
            </div>   
            </Container>
    </ThemeProvider>
         )

    }