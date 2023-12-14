import { useNavigate } from "react-router";
import { MotionBox, MotionField } from "~/ui/motion";
import { Box, Button, Link, Text } from "~/ui";
import { aon } from "~/sdk";
import { useState } from 'react';

export function EmailSignupRoute() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <>
      <MotionBox
        className={"flex-col items-center gap-[36px]"}
        variants={{
          initial: {},
          animate: {
            transition: { when: "beforeChildren", staggerChildren: 0.01 },
          },
          exit: {
            transition: { when: "beforeChildren", staggerChildren: 0.01 },
          },
        }}
      >
        <MotionField
          placeholder="Email"
          className={"text-center"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        />
        <MotionField
          placeholder="Display Name"
          className={"text-center"}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        />
        <MotionField
          placeholder="Password"
          className={"text-center"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        />
        <MotionField
          placeholder="Confirm Password"
          className={"text-center"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        />
      </MotionBox>
      <Text className="<md:text-xs">
        I AM 18+ AND I ACCEPT THE <Link to={"/terms"}>TERMS OF SERVICE</Link>
      </Text>
      <Button onClick={async () => {
        await aon.signup({ email, displayName, password }); 
        navigate("/auth/signup/interests", {
          state: {
            email,
            password,
          }});
      }}
        >
        Create Account
      </Button>
      <Box className="gap-[20px] text-center">
        <Link to={"/auth/signup"} className="<md:text-sm">
          Use social account
        </Link>
        <Link to={"/auth/signin"} className="<md:text-sm">
          Already have an account?
        </Link>
      </Box>
    </>
  );
}
