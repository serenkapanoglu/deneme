import { useAsync } from "react-async-hook";
import FollowCard from "~/components/FollowCard";
import { aon } from "~/sdk";
import { Box } from "~/ui";

export default function FollowersRoute() {
  const { result: followers, execute: fetchFollows } = useAsync(
    aon.getFollowedUsers,
    [],
    {
      executeOnMount: true,
      executeOnUpdate: false,
    }
  );

  return (
    <Box
      className={
        "grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 <lg:px-[20px]"
      }
    >
      {followers?.map((x) => (
        <FollowCard
          key={x.followed._id}
          follow={x}
          onUnfollow={async () => {
            await aon.unfollowUser(x.followed._id);
            await fetchFollows();
          }}
        />
      ))}
    </Box>
  );
}
