import { Logo } from "~/components/Logo";
import { Box, Text } from "~/ui";
import { Navigate } from "react-router";
import { InterestsRoute } from "./signup/interests";
import { SignInRoute } from "./signin";
import { SignUpRoute } from "./signup";
import { EmailSignupRoute } from "./signup/email";
import { ResetPasswordRoute } from "./reset";
import { ForgotPasswordRoute } from "./forgot";
import { AnimatePresence } from "framer-motion";
import { MotionBox, MotionLink } from "~/ui/motion";
import { childVariants, parentVariants } from "~/util/motion";
import { RouteSwitch } from "~/components/RouteSwitch";

export default function AuthRouter(props: { title?: string }) {
  const { title } = props;

  return (
    <Box
      className={"flex-1 flex-col justify-center <md:px-[20px] <md:py-[56px]"}
    >
      <AnimatePresence initial mode="wait">
        <MotionBox
          className={"flex-col gap-[60px] items-center"}
          variants={parentVariants({ fade: 1, stagger: 0.2 })}
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
        >
          <MotionLink
            to={"/auth/signin"}
            className="max-w-70%"
            variants={childVariants({ fade: 1 })}
          >
            <Logo showBeta />
          </MotionLink>
          <MotionBox
            variants={childVariants({ fade: 1 })}
            className={"flex-col gap-[40px] items-center"}
          >
            {title && (
              <Text
                className={
                  "uppercase tracking-[7px] text-[36px] <md:text-[20px]"
                }
              >
                {title}
              </Text>
            )}
            <RouteSwitch
              className={"flex flex-col gap-[40px] items-center"}
              routes={[
                {
                  key: "signin",
                  patterns: ["/auth/signin"],
                  Component: SignInRoute,
                },
                {
                  key: "signup",
                  patterns: ["/auth/signup"],
                  Component: SignUpRoute,
                },
                {
                  key: "email-signup",
                  patterns: ["/auth/signup/email"],
                  Component: EmailSignupRoute,
                },
                {
                  key: "interests",
                  patterns: ["/auth/signup/interests"],
                  Component: InterestsRoute,
                },
                {
                  key: "reset",
                  patterns: ["/auth/reset"],
                  Component: ResetPasswordRoute,
                },
                {
                  key: "forgot",
                  patterns: ["/auth/forgot"],
                  Component: ForgotPasswordRoute,
                },
                {
                  key: "fallback",
                  patterns: ["*"],
                  Component: () => <Navigate to="/auth/signin" replace />,
                },
              ]}
            />
          </MotionBox>
        </MotionBox>
      </AnimatePresence>
    </Box>
  );
}
