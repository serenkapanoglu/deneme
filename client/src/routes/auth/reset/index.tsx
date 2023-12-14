import { Button, Field } from "~/ui";

export function ResetPasswordRoute() {
  return (
    <>
      <Field
        placeholder="New password"
        type="password"
        className={"text-center"}
      />
      <Field
        placeholder="Confirm new password"
        type="password"
        className={"text-center"}
      />
      <Button>Confirm and login</Button>
    </>
  );
}
