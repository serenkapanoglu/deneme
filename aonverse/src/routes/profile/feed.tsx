import { AnimatePresence } from "framer-motion";
import { matchPath, useLocation } from "react-router";
import { Container } from "~/components/Container";
import Feed from "~/components/Feed";
import Sidebar from "~/components/Sidebar";
import { aon } from "~/sdk";
import { MotionBox } from "~/ui/motion";
import { parentVariants } from "~/util/motion";

export default function FeedRoute() {
  const location = useLocation();
  const match = matchPath("/profile/:userId/*", location.pathname);
  const logged = aon.store((x) => x.session?.user);
  const slug = logged?.slug;

  return (
    <Sidebar side="right" collapsible>
      <Container
        size={800}
        className="py-[56px] box-content <md:px-[20px] <md:box-border grid"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <MotionBox
            key={match?.params.userId}
            variants={parentVariants({ fade: 1, duration: 1 })}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Feed
              fetcher={async () =>
                aon.getMyProfileFeed(slug || "")
              }
              disableTabs
            />
          </MotionBox>
        </AnimatePresence>
      </Container>
    </Sidebar>
  );
}
