

//import { MoreInfo } from './MoreInfo-component';
import styled from "styled-components";
import { MarketingHeader } from './header-component';
import { UniversFooter } from './footer-component';
import { NftMarketplace } from './nft-component';
import { WhoAreWe } from './WhoAreWe-component';
import Navbar from "./navbar/Navbar-component";
import { useState } from "react";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "styled-components";
import { Timeline } from "./timeline-component";


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
    height:'100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};

const NftMarket={
  backgroundImage: "url(./img/purplebox.png)",
  height:'100vh',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const WhoAreWeSection={
  backgroundImage: "url(/img/bluebox.png)",
  height:'100vh',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const TimelineSection={
  backgroundImage: "url(/img/bluebox.png)",
  height:'50vh',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const Footer={
  backgroundImage: "url(/img/footerlogo.png)",
  height:'100vh',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};


export const BoxContainerA = styled.div`
    width: 1200px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
    position: relative;
    margin-top: 10 px;
    overflow: hidden;
    z-index: 1;
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
const MenuContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: right;
    justify-content: right;
    z-index: 10;
`;
const SubMenuContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: right;
    justify-content: right;
    z-index: 10;
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
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: cent;
    margin-top: auto;
    margin-left: 10 px;
    z-index: 10;
`;

const HeaderItems2 = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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
    padding-bottom: 150px;
    margin-top: 200 px;
    column-gap: 40px;
    z-index: 10;
`;
const FooterContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: auto;
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

export function MarketingView() {
    const [mode, setMode] = useState(false);
        return(  
            <ThemeProvider theme={mode ? theme : darktheme}>
      <GlobalStyles />
      <Container>
            <div>
            <Navbar setMode={setMode} mode={mode} />
            <div style={ topHeader }><MarketingHeader /></div>
            <div style={ NftMarket }><NftMarketplace /></div>


            <div style={ WhoAreWeSection }><WhoAreWe /></div>
            <div style={ TimelineSection }><Timeline /></div>
            <div style={ Footer }><UniversFooter /></div>
    
            </div>   
            </Container>
    </ThemeProvider>
         )

    }