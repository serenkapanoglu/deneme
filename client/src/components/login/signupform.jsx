import React from "react";
import {
  FormContainer,
  Input,
  SubmitButton,
  BoldLink,
  Question,
} from "./common";
import { BoxContainerA } from "./login-component";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "~/utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }

    navigate("/createProfile");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <BoxContainerA>
      <FormContainer onSubmit={handleSubmit}>
        <Input
          type="text"
          className="btn btn-outline-light"
          placeholder="Username"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <Input
          type="email"
          placeholder="Email"
          className="btn btn-outline-light"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <Input
          type="password"
          className="btn btn-outline-light"
          placeholder="Password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <Input
          type="password"
          className="btn btn-outline-light"
          placeholder="Confirm Password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <SubmitButton type="submit" to="/signup/createProfile">
          Create Account
        </SubmitButton>
      </FormContainer>
      <Question>Already have an account?</Question>
      <BoldLink>
        <Link type="button" to="/login">
          Login
        </Link>
      </BoldLink>
    </BoxContainerA>
  );
};
