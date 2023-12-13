import { aon } from "~/sdk";
import { Box } from "~/ui";
import StarredRoute from "./starred";
import LikedRoute from "./liked";
import FollowersRoute from "./followers";
import SupportersRoute from "./supporters";
import { RouteSwitch } from "~/components/RouteSwitch";
import { Navigate } from "react-router";
import { LinkTab, LinkTabs } from "~/components/LinkTabs";
import { SearchIcon } from "~/util/icons";
import Sidebar from "~/components/Sidebar";

export default function CommunityRouter() {
  const logged = aon.store((x) => x.session?.user);

  return (
    <Sidebar side="right" collapsible>
      <Box className="flex flex-col gap-[40px] py-[40px]">
        <Box className="flex flex-row items-center justify-between <lg:px-[20px] gap-[20px]">
          {/* Search bar */}
          <Box className="bg-[var(--color-divider)] rounded-full border-none flex flex-row items-center">
            <input className="bg-transparent border-none rounded-full p-4 text-md text-[var(--color-text)] w-full" />
            <SearchIcon className="h-[20px] w-[20px] opacity-50 mr-[12px]" />
          </Box>

          {/* Tabs */}
          <LinkTabs>
            <LinkTab link={`/profile/${logged?._id}/community/starred`}>
              Starred
            </LinkTab>
            <LinkTab link={`/profile/${logged?._id}/community/liked`}>
              Liked
            </LinkTab>
            <LinkTab link={`/profile/${logged?._id}/community/followers`}>
              Followers
            </LinkTab>
            <LinkTab link={`/profile/${logged?._id}/community/supporters`}>
              Supporters
            </LinkTab>
          </LinkTabs>
        </Box>

        <RouteSwitch
          id="community"
          routes={[
            {
              key: "starred",
              patterns: [`/profile/${logged?._id}/community/starred`],
              Component: StarredRoute,
            },
            {
              key: "liked",
              patterns: [`/profile/${logged?._id}/community/liked`],
              Component: LikedRoute,
            },
            {
              key: "followers",
              patterns: [`/profile/${logged?._id}/community/followers`],
              Component: FollowersRoute,
            },
            {
              key: "supporters",
              patterns: [`/profile/${logged?._id}/community/supporters`],
              Component: SupportersRoute,
            },
            {
              key: "fallback",
              patterns: [`/profile/${logged?._id}/community/*`],
              Component: () => (
                <Navigate
                  to={`/profile/${logged?._id}/community/starred`}
                  replace
                />
              ),
            },
          ]}
        />
      </Box>
    </Sidebar>
  );
}
