import React from "react";
import { FormContainer, Input, SubmitButton, BoldLink } from "~/login/common";
import { BoxContainerA } from "~/login/login-component";

export function SignupForm() {
  return (
    <BoxContainerA>
      <FormContainer>
        <Input type="text" placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
      </FormContainer>
      <SubmitButton type="submit">Create Account</SubmitButton>
      <div>
        Already have an account?
        <BoldLink href="#" onClick="">
          Connect
        </BoldLink>
      </div>
    </BoxContainerA>
  );
}
