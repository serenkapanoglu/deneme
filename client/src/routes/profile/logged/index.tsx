import AchievementsRoute from "./achievements";
import LayoutsRoute from "./layouts";
import VotingRoute from "./voting";
import VotesRouter from "./votes";
import CommunityRouter from "./community";
import { RouteSwitch } from "~/components/RouteSwitch";
import { aon } from "~/sdk";
import FeedRoute from "../feed";
import WalletRouter from "./wallet";

export default function LoggedProfileRouter() {
  const logged = aon.store((x) => x.session?.user);

  return (
    <RouteSwitch
      routes={[
        {
          key: "profile",
          patterns: [`/profile/${logged?._id}/`],
          Component: FeedRoute,
        },
        {
          key: "community",
          patterns: [`/profile/${logged?._id}/community/*`],
          Component: CommunityRouter,
        },
        {
          key: "achievements",
          patterns: [`/profile/${logged?._id}/achievements`],
          Component: AchievementsRoute,
        },
        {
          key: "layouts",
          patterns: [`/profile/${logged?._id}/layouts`],
          Component: LayoutsRoute,
        },
        {
          key: "voting",
          patterns: [`/profile/${logged?._id}/voting`],
          Component: VotingRoute,
        },
        {
          key: "wallet",
          patterns: [`/profile/${logged?._id}/wallet/*`],
          Component: WalletRouter,
        },
        {
          key: "votes",
          patterns: [`/profile/${logged?._id}/votes/*`],
          Component: VotesRouter,
        },
      ]}
    />
  );
}
