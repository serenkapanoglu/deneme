import { useNavigate } from "react-router";
import { MotionBox } from "~/ui/motion";
import { Box, Button, Text } from "~/ui";
import { aon } from "~/sdk";
import { useLocation } from 'react-router-dom';

const Interest = (props: { seed?: number }) => {
  const { seed } = props;

  return (
    <MotionBox
      className={"w-[100px] h-[100px] rounded-full bg-[#111] cursor-pointer"}
      variants={{
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.9, opacity: 0 },
      }}
      style={{
        backgroundImage: `url(https://picsum.photos/seed/interest-${seed}/300/300)`,
      }}
    />
  );
};

export function InterestsRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state || {};
  console.log(email, password);

  const handleContinue = async () => {
    try {
      // Ensure that email and password are available before using them
      if (email && password) {
        await aon.signin({ email, password });
        navigate("/");
      } else {
        console.error('Email and password are missing in the state.');
      }
    } catch (error) {
      console.error('Error during signin:', error);
    }
  };

  return (
    <>
      <Text>What are you interest? Pick your poison.</Text>
      <MotionBox
        className={
          "flex-row gap-[40px] justify-center max-w-full flex-wrap <md:gap-[20px]"
        }
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
        {Array(7)
          .fill("")
          .map((_, i) => (
            <Interest key={i} seed={i} />
          ))}
      </MotionBox>
      <Text className="<md:text-[14px] text-center">
        I would NOT like NSFW content included in my stream
      </Text>
      <Text className="<md:text-[14px]">
        I solemnly swear that I am not a robot
      </Text>
      <Box className="gap-[24px] <md:gap-[20px] <md:flex-col-reverse">
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Box>
    </>
  );
}
