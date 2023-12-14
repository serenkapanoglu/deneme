import { Button, Field, Link } from "~/ui";
import { aon } from "~/sdk";
import { useNavigate } from "react-router";
import { useState } from 'react';

export function SignInRoute() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Field 
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={"text-center"} 
      />
      <Field
        placeholder="Password"
        type={"password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={"text-center"}
      />
      <Button
      onClick={async () => {
        await aon.signin({ email, password });
        navigate("/");
      }}
      >Let's Go</Button>
      <Link to={"/auth/forgot"}>Forgot Password</Link>
      <Link to={"/auth/signup"}>Sign Up</Link>
    </>
  );
}
