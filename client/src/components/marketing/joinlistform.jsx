import React from "react";
import { FormContainer, Input, SubmitButton, BoldLink } from "~/login/common";
import { BoxContainerA } from "~/login/login-component";

export function JoinlistForm() {
  return (
    <BoxContainerA>
      <FormContainer>
        <Input type="text" placeholder="Name" />
        <Input type="text" placeholder="email" />
        <Input type="text" placeholder="Type of interest" />
      </FormContainer>
      <SubmitButton type="submit">Submit</SubmitButton>
    </BoxContainerA>
  );
}
