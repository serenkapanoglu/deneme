import { AnimatePresence } from "framer-motion";
import { aon } from "~/sdk";
import { Avatar, Box, Button, Image, Text } from "~/ui";
import { matchPath, useLocation } from "react-router";
import { MotionBox, MotionLink } from "~/ui/motion";
import { childVariants, parentVariants } from "~/util/motion";
import LoggedProfileRouter from "./logged";
import { LoadingContainer } from "~/components/LoadingContainer";
import millify from "millify";
import { useAsync } from "react-async-hook";
import { RouteSwitch } from "~/components/RouteSwitch";
import FeedRoute from "./feed";
import { LinkList, LinkListItem } from "~/components/LinkList";
import { FollowIcon, MessageIcon, MoneyIcon } from "~/util/icons";
import Sidebar from "~/components/Sidebar";

export default function ProfileRouter() {
  const logged = aon.store((x) => x.session?.user);// Is this the dummy user or
  
  const location = useLocation();
  const profileMatch = matchPath(`/profile/:id`, location.pathname);

  const { result: user } = useAsync(
    aon.getUser,
    [profileMatch?.params.id || ""],
    { 
      executeOnMount: true,
      executeOnUpdate: true,
    }
  );
  
  const loggedMatch = matchPath(`/profile/${logged?._id}`, location.pathname) || matchPath(`/profile/${logged?._id}/*`, location.pathname);

  const showsHeader = matchPath(`/profile/:id`, location.pathname);

  const followers = user?.followers?.length || 0;
  const supporters = user?.supporters?.length || 0;
  const imageURL = `http://localhost:8000/api${user?.backimage}`;
  const imageProfURL = `http://localhost:8000/api${user?.profimage}`;

  return (
    <Box className="flex-1 relative max-w-full">
      {/* Header section */}
      <AnimatePresence>
        {showsHeader && (
          <MotionBox
            className="h-[var(--size-cover)] relative overflow-hidden bg-[var(--bg2)] grid"
            variants={{
              initial: { height: 0 },
              animate: { height: "var(--size-cover)" },
              exit: { height: 0 },
            }}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <AnimatePresence>
              {showsHeader && !!logged && (
                <MotionBox
                  className="row-start-1 col-start-1"
                  key={`profile-${user?._id}`}
                  variants={childVariants({ fade: 1 })}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {/* Cover image */}
                  <LoadingContainer className="h-[var(--size-cover)] relative">
                    <Image
                      src={imageURL}
                      className="min-w-full absolute left-1/2 -translate-x-1/2"
                    />
                  </LoadingContainer>

                  {/* Profile info */}
                  <Box className="absolute z-10 w-[var(--size-sidebar)] h-full left-0 bg-[var(--bg-caption)] <md:w-full backdrop-blur-md">
                    <MotionBox
                      className="h-full flex flex-col space-y-[40px] align-center justify-center box-border p-[40px] <md:p-[20px]"
                      variants={parentVariants({ stagger: 0.03 })}
                    >
                      <MotionBox
                        className="flex flex-col space-y-[20px] items-center align-center"
                        variants={childVariants({ fade: 1 })}
                      >
                        <Avatar src={imageProfURL} size={200} />
                        <Text className="text-xl">{user?.displayName}</Text>
                        <Text className="text-xl">{user?.title}</Text>
                      </MotionBox>
                      <MotionBox
                        className="flex flex-col space-y-[20px] items-center align-center"
                        variants={parentVariants({ stagger: 0.03 })}
                      >
                        <MotionBox
                          variants={childVariants({ fade: 1 })}
                          className="text-sm"
                        >
                          {millify(followers, { precision: 0 })} FOLLOWERS
                        </MotionBox>
                        <MotionBox
                          variants={childVariants({ fade: 1 })}
                          className="text-sm"
                        >
                          {millify(supporters, { precision: 0 })} SUPPORTERS
                        </MotionBox>
                        {!loggedMatch && (
                          <MotionLink
                            to={"/"}
                            variants={childVariants({ fade: 1 })}
                            className="flex flex-row items-center gap-1"
                          >
                          <FollowIcon />
                          <Text className="text-sm">Follow</Text>
                          </MotionLink>
                        )}
                        {!loggedMatch && (
                          <MotionLink
                            to={"/"}
                            variants={childVariants({ fade: 1 })}
                            className="flex flex-row items-center gap-1"
                          >
                            <MessageIcon />
                            <Text className="text-sm">Message</Text>
                          </MotionLink>
                        )}
                      </MotionBox>
                    </MotionBox>
                  </Box>
                </MotionBox>
              )}
            </AnimatePresence>
          </MotionBox>
        )}
      </AnimatePresence>

      {/* Bottom section */}
      <Sidebar
        sidebarContent={
          <AnimatePresence initial mode="wait">
            {!loggedMatch ? (
              <MotionBox
                key={`unlogged`}
                variants={parentVariants({ duration: 0.1, fade: 1 })}
                initial={"initial"}
                animate={"animate"}
                exit={"exit"}
              >
                <Box className="flex flex-row gap-2">
                  <Button className="min-w-[140px] gap-2 flex-1">
                    <MoneyIcon display={"block"} />
                    <Text>Support</Text>
                  </Button>
                  <Button
                    variant="outlined"
                    className="min-w-[140px] gap-2 flex-1"
                  >
                    <MoneyIcon display={"block"} />
                    <Text>Donate</Text>
                  </Button>
                </Box>
              </MotionBox>
            ) : (
              <MotionBox
                key={`logged`}
                variants={parentVariants({ duration: 0.1, fade: 1 })}
                initial={"initial"}
                animate={"animate"}
                exit={"exit"}
              >
                <LinkList>
                  <LinkListItem link={`/profile/${logged?._id}`}>
                    Profile
                  </LinkListItem>
                  <LinkListItem
                    link={`/profile/${logged?._id}/community`}
                    highlightPath={`/profile/${logged?._id}/community/*`}
                  >
                    Community
                  </LinkListItem>
                  <LinkListItem link={`/profile/${logged?._id}/achievements`}>
                    Achievements
                  </LinkListItem>
                  <LinkListItem link={`/profile/${logged?._id}/layouts`}>
                    Layouts
                  </LinkListItem>
                  <LinkListItem link={`/profile/${logged?._id}/voting`}>
                    Voting
                  </LinkListItem>
                  <LinkListItem
                    link={`/profile/${logged?._id}/wallet`}
                    highlightPath={`/profile/${logged?._id}/wallet/*`}
                  >
                    Wallet
                  </LinkListItem>
                </LinkList>
              </MotionBox>
            )}
          </AnimatePresence>
        }
      >
        {/* Content container */}
        <RouteSwitch
          routes={[
            {
              key: "logged",
              patterns: [`/profile/${logged?._id}`, `/profile/${logged?._id}/*`],
              Component: LoggedProfileRouter,
            },
            {
              key: "profile",
              patterns: ["/profile/:userId"],
              Component: FeedRoute,
            },
          ]}
        />
      </Sidebar>
    </Box>
  );
}
