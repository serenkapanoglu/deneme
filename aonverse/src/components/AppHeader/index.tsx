import { Logo } from "../Logo";
import { ReactNode, forwardRef, useEffect, useState } from "react";
import clsx from "clsx";
import throttle from "lodash/throttle";
import { aon, useAon } from "~/sdk";
import {
  AchievementIcon,
  BugIcon,
  CaretDownIcon,
  CommentIcon,
  ContentIcon,
  DarkModeIcon,
  LightModeIcon,
  SearchIcon,
  SettingsIcon,
  SignOutIcon,
  StarIcon,
} from "~/util/icons";
import millify from "millify";
import { childVariants, parentVariants } from "~/util/motion";
import { Avatar, Box, Divider, Link, Text } from "~/ui";
import { MotionBox, MotionDivider } from "~/ui/motion";
import { Popover } from "../Popover";
import { dummyInboxMessages } from "~/util/dummyContent";
import { DateTime } from "luxon";
import { AnimatePresence } from "framer-motion";
import { useLocation, useMatch, useNavigate } from "react-router";
import { useTheme } from "../Theme";
import mobileLogo from "./logo-mobile.png";
import userdefault from "/other/userimage.png";

export const AppHeader = forwardRef<any, {}>(function (_props, ref) {
  const momentum = aon.state((x) => x.header.momentum);
  const logged = useAon((x) => x.session?.user);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const imageProfURL = `http://localhost:8000/api${logged?.profimage}`;

  const exploreMatch = useMatch("/");
  const profileMatch = useMatch("/profile/:id");

  const [menuOpen, setMenuOpen] = useState<
    undefined | "notifications" | "inbox" | "account"
  >(undefined);

  const COMMENT_AMT = logged?.supporters?.length || 0;

  //reset momentum whenever page his changed
  useEffect(() => {
    aon.state.setState((x) => {
      x.header.momentum = "up";
    });
  }, [location]);

  useEffect(() => {
    if (menuOpen) return;
    if (!profileMatch && !exploreMatch) return;

    let lastY = 0;
    const listener = throttle((_e: Event) => {
      aon.state.setState((x) => {
        x.header.momentum = window.scrollY < lastY ? "up" : "down";
      });
      lastY = window.scrollY;
    }, 10);
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [menuOpen, exploreMatch, profileMatch]);

  return (
    <MotionBox
      ref={ref}
      className={clsx(
        "fixed top-0 w-full flex flex-row items-center space-between h-[var(--size-header)] px-[20px] bg-[var(--bg1)] transition z-50 border-0 border-b-[1px] border-solid border-[var(--color-divider)]",
        momentum === "up" || menuOpen !== undefined
          ? "opacity-100"
          : "opacity-0"
      )}
      initial={{ top: -100 }}
      animate={{ top: 0 }}
      exit={{ top: -100 }}
    >
      {/* Left side */}
      <Box className="flex-1 flex flex-row <md:hidden">
        <Link to={"/"}>
          <Logo size={280} />
        </Link>
      </Box>
      <Box className="flex-1 flex-row hidden <md:flex">
        <Link to={"/"}>
          <img
            src={mobileLogo}
            width={32}
            style={{
              filter: theme.mode === "light" ? "invert(100)" : undefined,
            }}
          />
        </Link>
      </Box>

      {/* Right side */}
      <MotionBox
        className="flex flex-row gap-[12px] items-center"
        variants={parentVariants({ stagger: 0.01, reverse: true })}
      >
        {/* Search field */}
        <MotionBox
          className="flex flex-row justify-end px-12px box-border items-center bg-[var(--bg-input)] h-[44px] rounded-full w-[200px] cursor-pointer <lg:hidden"
          variants={childVariants({ fade: 1, scale: 0.05 })}
        >
          <SearchIcon className="h-[20px] w-[20px] opacity-50" />
        </MotionBox>

        {/* Notifications */}
        <Popover
          isOpen={menuOpen === "notifications"}
          positions={["bottom"]}
          containerClassName="z-51"
          content={
            /*  Notification popup menu */
            <AnimatePresence initial>
              <MotionBox
                className="w-[420px] max-h-[550px] overflow-auto"
                initial={"initial"}
                animate={"animate"}
                exit={"exit"}
                variants={parentVariants({
                  duration: 0.01,
                  fade: 1,
                  stagger: 0.05,
                })}
              >
                {dummyInboxMessages
                  .slice(0, 10)
                  .flatMap((x) => [
                    <MotionBox
                      key={x.id}
                      className="flex flex-row gap-[20px] p-[20px] cursor-pointer hover:bg-[var(--color-hover)]"
                      onClick={() => setMenuOpen(undefined)}
                      variants={childVariants({ fade: 1, slideY: 10 })}
                    >
                      <Box>
                        <Avatar size={48} src={x.user.profimage} />
                      </Box>
                      <Box className="flex flex-col gap-[4px]">
                        <Box className="text-sm">
                          {x.user.displayName} shared your post
                        </Box>
                        <Box className="text-xs opacity-40">
                          {DateTime.fromISO(x.created_at).toRelative()}
                        </Box>
                      </Box>
                    </MotionBox>,
                    <Divider key={`divider-${x.id}`} />,
                  ])
                  .slice(0, -1)}
              </MotionBox>
            </AnimatePresence>
          }
        >
          {/* Notifications icon button */}
          <MotionBox
            className="flex flex-row gap-[8px] items-center hover:bg-[var(--color-hover)] rounded-2xl cursor-pointer p-[12px]"
            variants={childVariants({ fade: 1, scale: 0.05 })}
            onClick={() =>
              setMenuOpen((x) =>
                x === "notifications" ? undefined : "notifications"
              )
            }
          >
            <StarIcon className="h-[20px] w-[20px]" />
            <Box className="text-[20px]">{logged?.stars}</Box>
          </MotionBox>
        </Popover>

        {/* Inbox */}
        <Popover
          isOpen={menuOpen === "inbox"}
          positions={["bottom"]}
          containerClassName="z-51 max-w-[100%]"
          content={
            /*  Inbox popup menu */
            <AnimatePresence initial>
              <MotionBox
                className="w-[420px] max-h-[550px] overflow-auto"
                initial={"initial"}
                animate={"animate"}
                exit={"exit"}
                variants={parentVariants({
                  duration: 0.01,
                  fade: 1,
                  stagger: 0.05,
                })}
              >
                {dummyInboxMessages
                  .slice(0, 10)
                  .flatMap((x) => [
                    <MotionBox
                      key={x.id}
                      className="flex flex-row gap-[20px] p-[20px] cursor-pointer hover:bg-[var(--color-hover)]"
                      onClick={() => setMenuOpen(undefined)}
                      variants={childVariants({ fade: 1, slideY: 10 })}
                    >
                      <Box>
                        <Avatar size={48} src={x.user.profimage} />
                      </Box>
                      <Box className="flex flex-col gap-[12px] flex-1">
                        <Box className="flex flex-row gap-[8px] items-center">
                          <Box className="text-md">{x.user.displayName}</Box>
                          <Box className="text-xs opacity-40">
                            {DateTime.fromISO(x.created_at).toRelative()}
                          </Box>
                        </Box>
                        <Box className="text-sm">{x.content}</Box>
                      </Box>
                    </MotionBox>,
                    <Divider key={`divider-${x.id}`} />,
                  ])
                  .slice(0, -1)}
              </MotionBox>
            </AnimatePresence>
          }
        >
          {/* Inbox icon button */}
          <MotionBox
            className="flex flex-row gap-[8px] items-center hover:bg-[var(--color-hover)] rounded-2xl cursor-pointer p-[12px]"
            variants={childVariants({ fade: 1, scale: 0.05 })}
            onClick={() =>
              setMenuOpen((x) => (x === "inbox" ? undefined : "inbox"))
            }
          >
            <CommentIcon className="h-[20px] w-[20px]" />
            <Box className="text-[20px]">{millify(COMMENT_AMT)}</Box>
          </MotionBox>
        </Popover>

        {/* Account menu */}
        <Popover
          isOpen={menuOpen === "account"}
          positions={["bottom"]}
          containerClassName="z-51 max-w-[100%]"
          content={
            /*  Account popup menu */
            <AnimatePresence initial>
              <MotionBox
                className="w-[420px] max-h-[550px] overflow-hidden"
                initial={"initial"}
                animate={"animate"}
                exit={"exit"}
                variants={parentVariants({
                  duration: 0.01,
                  fade: 1,
                  stagger: 0.02,
                })}
              >
                {/* User info */}
                <MotionBox
                  className="flex flex-row items-center gap-[12px] p-[20px]"
                  variants={childVariants({ fade: 1, slideY: 10 })}
                >
                  <Avatar size={60} src={imageProfURL} defaultSrc={userdefault} />
                  <Box className="flex flex-col flex-1 gap-[4px]">
                    <Text>{logged?.displayName}</Text>
                    <Link
                      to={`/profile/${logged?._id}`}
                      className={"opacity-50 text-sm"}
                      onClick={() => {
                        setMenuOpen(undefined);
                      }}
                    >
                      View your profile
                    </Link>
                  </Box>
                </MotionBox>
                <Divider />
                {/* Account menu */}
                {(
                  [
                    {
                      icon: <AchievementIcon className="w-[20px] h-[20px]" />,
                      title: "Achievements",
                      onClick: () =>
                        navigate(`/profile/${logged?._id}/achievements`),
                    },
                    {
                      icon: <SettingsIcon className="w-[20px] h-[20px]" />,
                      title: "Settings",
                      onClick: () => navigate(`/settings`),
                    },
                    {
                      icon: <ContentIcon className="w-[20px] h-[20px]" />,
                      title: "Content Preferences",
                      onClick: () => navigate(`/settings/preferences`),
                    },
                    {
                      icon: <BugIcon className="w-[20px] h-[20px]" />,
                      title: "Report a bug",
                      onClick: () => navigate(`/settings/bug`),
                    },
                    theme.mode === "dark"
                      ? {
                          icon: <LightModeIcon className="w-[20px] h-[20px]" />,
                          title: "Light mode",
                          onClick: () => theme.setMode("light"),
                        }
                      : {
                          icon: <DarkModeIcon className="w-[20px] h-[20px]" />,
                          title: "Dark mode",
                          onClick: () => theme.setMode("dark"),
                        },
                    {
                      icon: <SignOutIcon className="w-[20px] h-[20px]" />,
                      title: "Logout",
                      onClick() {
                        aon.signout();
                      },
                    },
                  ] satisfies {
                    icon: ReactNode;
                    title: string;
                    onClick?: () => void;
                  }[]
                )
                  .flatMap((x, i) => [
                    <MotionBox
                      key={i}
                      className="flex flex-row items-center gap-[12px] p-[20px] hover:bg-[var(--color-hover)] cursor-pointer"
                      variants={childVariants({ fade: 1, slideY: 10 })}
                      onClick={() => {
                        setMenuOpen(undefined);
                        x.onClick?.();
                      }}
                    >
                      {x.icon}
                      <Text className="uppercase text-sm">{x.title}</Text>
                    </MotionBox>,
                    <MotionDivider
                      key={`divider-${i}`}
                      variants={childVariants({ fade: 1 })}
                    />,
                  ])
                  .slice(0, -1)}
              </MotionBox>
            </AnimatePresence>
          }
        >
          {/* Account icon button */}
          <MotionBox
            className="flex flex-row items-center hover:bg-[var(--color-hover)] rounded-2xl cursor-pointer p-[12px] pr-[4px]"
            variants={childVariants({ fade: 1, scale: 0.05 })}
            onClick={() =>
              setMenuOpen((x) => (x === "account" ? undefined : "account"))
            }
          >
            <Avatar size={32} src={imageProfURL} />
            <CaretDownIcon className="h-[28px] w-[28px]" />
          </MotionBox>
        </Popover>
      </MotionBox>
    </MotionBox>
  );
});
