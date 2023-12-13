import { useNavigate } from "react-router";
import { MotionBox, MotionButton } from "~/ui/motion";
import { Link } from "~/ui";

export function SignUpRoute() {
  const navigate = useNavigate();

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
        <MotionButton
          onClick={() => navigate("/auth/signup/interests")}
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        >
          Facebook
        </MotionButton>
        <MotionButton
          onClick={() => navigate("/auth/signup/interests")}
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        >
          Google
        </MotionButton>
        <MotionButton
          onClick={() => navigate("/auth/signup/interests")}
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        >
          Twitter
        </MotionButton>
        <Link to={"/auth/signup/email"}>Email sign up</Link>
        <Link to={"/auth/signin"}>Already have an account?</Link>
      </MotionBox>
    </>
  );
}
