import { Component } from 'react';
import { useState } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "styled-components";
import { Main } from './components/login/login-component';
import './App.css';
import Navbar from "./components/marketing/navbar/Navbar-component";
import { Routes, Route } from 'react-router-dom';
import { AboutView } from './components/marketing/about-component';
import { MarketingView } from './components/marketing/marketing-component';
import { DonateView } from './components/marketing/donate-component';
import { TimelineView } from './components/marketing/timelinetracker-component';
import { NavBtns } from './components/login/sign-log-navbtns.component';
import { SignUpForm } from './components/login/signupform.jsx';
import { CreateProfile } from './components/Profile/create-profile';
import { ForgotPass } from './components/login/forgotpassword';
import { UpdatePass } from './components/login/updatepass';
import { UserProfile } from './components/Profile/Pages/UserProfilePage/userprofile.component.jsx';
import SignInForm from './components/login/loginform.jsx';

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

function App() {
  const [mode, setMode] = useState(false);
  return (
    <ThemeProvider theme={mode ? theme : darktheme}>
      <GlobalStyles />
      <Container>
        <Routes>
                        <Route path='/' element={<MarketingView />}/>
                        <Route path='/about' element={<AboutView />}/>
                        <Route path='/donate' element={<DonateView />}/>
                        <Route path='/timeline' element={<TimelineView />}/>
                        <Route path='/aonverse' element={<NavBtns />}/>
                        <Route path='login' element={<SignInForm />}/>
                        <Route path='forgotpassword' element={<ForgotPass />}/>
                        <Route path='updatepass' element={<UpdatePass />}/>
                        <Route path='signup' element={<SignUpForm />}/>
                        <Route path='createProfile' element={<CreateProfile />}/>
                        <Route path='userprofile/:id/*' element={<UserProfile />}/>
                    </Routes>
      </Container>
    </ThemeProvider>
          );
        
        }

export default App;
