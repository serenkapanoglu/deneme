import React, { useContext } from "react";
import {
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
  MutedLink,
  BoldLink,
  Question,
} from "./common";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailandPassword,
} from "~/utils/firebase/firebase.utils";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UniversHeader } from "./aonverseheader";
import styled from "styled-components";
import { UserContext } from "~/contexts/user.context";

const myStyle = {
  backgroundImage: "url(/img/univers.png)",
  height: "100vh",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100%",
};

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BoxContainerA = styled.div`
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

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { currentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    await navigate(`/userprofile/${currentUser?.uid}`);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailandPassword(
        email,
        password
      );

      resetFormFields();
      navigate(`/userprofile/${currentUser?.uid}`);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-Password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div style={myStyle}>
      <AppContainer>
        <BoxContainerA>
          <UniversHeader />
          <BoxContainer>
            <FormContainer onSubmit={handleSubmit}>
              <Input
                type="email"
                value={email}
                name="email"
                onChange={handleChange}
                className="btn btn-outline-light"
                placeholder="Email"
              />
              <Input
                type="password"
                value={password}
                name="password"
                onChange={handleChange}
                className="btn btn-outline-light"
                placeholder="Password"
              />
              <SubmitButton type="submit" to="/userprofile">
                Sign in
              </SubmitButton>
            </FormContainer>
            <MutedLink href="/forgotpassword">Forgot your password?</MutedLink>
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={signInWithGoogle}
            >
              Google Sign in
            </button>
            <Question>Don't have an account?</Question>
            <BoldLink>
              <Link type="button" to="/signup">
                Signup
              </Link>
            </BoldLink>
          </BoxContainer>
        </BoxContainerA>
      </AppContainer>
    </div>
  );
};

export default SignInForm;
