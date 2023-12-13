import { DateTime } from "luxon";
import { Avatar, Box, Divider, Link, Text } from "~/ui";

export function Comments(props: { comments?: CommentData[] }) {
  const { comments } = props;

  if (!comments?.length) return null;

  return (
    <Box className="flex flex-col gap-[40px] pt-[40px]">
      {comments
        .map((x) => <Comment key={x.id} comment={x} />)
        .flatMap((x, i) => [<Divider key={`${i}-divider`} />, x])}
    </Box>
  );
}

export function Comment(props: { comment: CommentData }) {
  const { comment } = props;
  const { user, created_at, content, replies } = comment;

  return (
    <Box>
      {/* meta bar */}
      <Box className="flex flex-row items-center gap-[12px]">
        <Link to={`/profile/${user._id}`}>
          <Avatar src={user.profimage} size={56} />
        </Link>
        <Box className="flex flex-row <md:flex-col items-center <md:items-start gap-[12px] <md:gap-[4px]">
          <Link to={`/profile/${user._id}`}>
            <Text className="text-[22px]">{user.displayName}</Text>
          </Link>
          <Box className="flex flex-row">
            {/* time */}
            <Text className="text-sm color-gray-500">
              {DateTime.fromISO(created_at).toRelative()}
            </Text>
          </Box>
        </Box>
      </Box>

      {/* message */}
      <Box className="leading-2xl">{content}</Box>

      {/* nested comments */}
      {replies?.length > 0 && (
        <Box className="ml-[40px]">
          <Comments comments={replies} />
        </Box>
      )}
    </Box>
  );
}
