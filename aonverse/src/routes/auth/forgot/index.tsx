import { useState } from 'react';
import { useNavigate } from "react-router";
import { Button, Field, Link } from "~/ui";
import axios from 'axios';

export function ForgotPasswordRoute() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const sendRecoveryEmail = async () => {
    try {
      // Make an axios call to the forgot password endpoint
      await axios.post('http://localhost:8000/auth/forgotPassword', { email });

      // If the request is successful, you can navigate to the reset password route or show a success message
      navigate("/auth/signin");
    } catch (error) {
      // Handle error, for example, show an error message to the user
      console.error('Error sending recovery email:', error);
    }
  };

  return (
    <>
      <Field
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={"text-center"}
      />
      <Button onClick={sendRecoveryEmail}>
        Send recovery email
      </Button>
      <Link to={"/auth/signin"}>Cancel</Link>
    </>
  );
}
