import styled from "styled-components";
import { AboutFooter } from "./aboutfooter-component";
import { AboutHeader } from './aboutheader-component';
import { OurStory } from './ourstory-component';
import { OurTeam } from './ourteam-component';
import { OurVision } from "./ourvision-component";
import { Spotlight } from "./Spotlight-component";

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


const aboutfooter={
    backgroundImage: "url(/img/bluebox.png)",
    height:'50vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};
export function AboutView() {
    const [mode, setMode] = useState(false);
    return(  
        <ThemeProvider theme={mode ? theme : darktheme}>
        <GlobalStyles />
        <Container>
        <div>
        <AboutNavbar setMode={setMode} mode={mode} />
            <div style={ topHeader }><AboutHeader /></div>
            <div style={ ourStory }><OurStory /></div>
            <div style={ ourTeam }><OurTeam /></div>
            <div style={ spotlight }><Spotlight /></div>
            <div style={ ourvision }><OurVision /></div>
            <div style={ aboutfooter }><AboutFooter /></div>
            </div>   
            </Container>
    </ThemeProvider>
         )

    }