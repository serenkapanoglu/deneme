import { Avatar, Box, Button, Text } from "~/ui";

export default function FollowCard(props: {
  follow: FollowData;
  onUnfollow?: () => void;
}) {
  const { follow, onUnfollow } = props;

  return (
    <Box className="rounded-lg border-1 border-solid border-[var(--color-divider)] p-4 flex flex-row gap-2">
      <Box>
        <Avatar src={follow?.followed.profimage} size={80} />
      </Box>
      <Box className="flex-1 flex flex-row items-center">
        <Box className="flex flex-col flex-1 gap-1">
          <Text>{follow?.followed.displayName}</Text>
        </Box>
        <Box>
          <Button className="min-w-0 text-xs" onClick={onUnfollow}>
            Unfollow
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
