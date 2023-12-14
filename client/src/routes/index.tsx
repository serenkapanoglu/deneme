import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router";
import { AppHeader } from "~/components/AppHeader";
import { Box } from "~/ui";
import { MotionBox } from "~/ui/motion";
import { parentVariants } from "~/util/motion";
import ProfileRouter from "./profile";
import ExploreRoute from "./profile/logged/explore";
import RankRoute from "./profile/logged/rank";
import { useEffect } from "react";
import { aon } from "~/sdk";
import { PostModal } from "~/modals/PostModal";
import AuthRouter from "./auth";
import { RouteSwitch } from "~/components/RouteSwitch";
import SettingsRoute from "./settings";

export default function RootRouter() {
  const logged = aon.store((x) => x.session?.user);

  //logic to make modals work
  let location = useLocation();
  let background = location.state && location.state.background;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [
    location.state?.background?.pathname + location.state?.background?.search ||
      location.pathname + location.search,
  ]);

  return (
    <>
      <Routes location={background || location}>
        <Route
          path="*"
          element={
            logged ? (
              <>
                <AppHeader key={"header"} />
                <Box className="flex-1 p-t-[var(--size-header)] relative max-w-full">
                  <RouteSwitch
                    routes={[
                      {
                        key: "explore",
                        patterns: ["/"],
                        Component: ExploreRoute,
                      },
                      {
                        key: "rank",
                        patterns: ["/rank"],
                        Component: RankRoute,
                      },
                      {
                        key: "profile",
                        patterns: ["/profile/*"],
                        Component: ProfileRouter,
                      },
                      {
                        key: "settings",
                        patterns: ["/settings/*"],
                        Component: SettingsRoute,
                      },
                    ]}
                  />
                </Box>
              </>
            ) : (
              <AuthRouter />
            )
          }
        />
      </Routes>

      <AnimatePresence initial={true} mode="wait">
        {background && (
          <MotionBox
          key={"modal"}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={parentVariants({})}
        >
            <Routes>
              <Route path="/post/:id" element={<PostModal />} />
              <Route path="/profile/:id" element={<PostModal />} />
            </Routes>
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  );
}
