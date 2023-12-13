import styled from "styled-components";
import logo from "./img/universlogo.png";
import universcopy from "./img/UniversCopy.png";
import { Routes, Route } from "react-router-dom";
import { NavBtns } from "./sign-log-navbtns.component";
import { SignUpForm } from "./signupform.jsx";
import SignInForm from "./loginform.jsx";
import { CreateProfile } from "~/Profile/create-profile";
import { BoxContainerB, MarketingView } from "~/marketing/marketing-component";
import { MyHomePage } from "~/Profile/Pages/UserProfilePage/userhomepage.component";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";

export const BoxContainerA = styled.div`
  width: 600px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
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

const myStyle = {
  backgroundImage: "url(/img/univers.png)",
  height: "100vh",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const myStyle1 = {
  backgroundImage: "url(/img/univers.png)",
  height: "100vh",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export function Main() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <AppContainer>
        <div style={myStyle}>
          <BoxContainerA>
            <HeaderContainer>
              <img alt="logo" src={logo} />
              <img alt="copy" src={universcopy} />
            </HeaderContainer>
            <BtnContainer>
              <Routes>
                <Route path="/" element={<NavBtns />} />
                <Route
                  path="/login"
                  element={<SignInForm setUser={setUser} />}
                />
                <Route
                  path="/userProfilePage"
                  element={
                    <ProtectedRoute user={user}>
                      <MyHomePage user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/createProfile" element={<CreateProfile />} />
              </Routes>
            </BtnContainer>
          </BoxContainerA>
        </div>
        <div style={myStyle1}>
          <BoxContainerB></BoxContainerB>
        </div>
      </AppContainer>
    </div>
  );
}
