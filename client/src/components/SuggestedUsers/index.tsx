import clsx from "clsx";
import { Avatar, Box, BoxProps, Link } from "~/ui";
import { useAsync } from "react-async-hook";
import { useEffect, useState } from 'react';
import defaultImg from '/crowns/gold.png';

interface SuggestedUsersProps extends BoxProps {
  fetcher: () => Promise<UserData[]>;
}

export default function SuggestedUsers(props: SuggestedUsersProps) {
  const { className, fetcher, ...rest } = props;
  const [suggestedUsers, setSuggestedUsers] = useState<UserData[]>([])

  const { result: users } = useAsync(fetcher, [], {
    executeOnUpdate: false,
  });

  useEffect(() => {
    if (users) {
      // Shuffle the array of users
      const shuffledUsers = [...users].sort(() => Math.random() - 0.5);
      
      // Take the first four users
      const selectedUsers = shuffledUsers.slice(0, 4);
      
      setSuggestedUsers(selectedUsers);
    }
  }, [users]);

  return (
    <Box {...rest} className={clsx("flex flex-col gap-[12px]", className)}>
      <Box className="text-[16px]">Suggested users</Box>
      <Box className="flex flex-row gap-[68px] py-[20px] <md:overflow-scroll">
        {suggestedUsers.map((user, index) => (
          <Link
            key={index}
            to={`/profile/${user._id}`}
            className="flex flex-col gap-[24px] items-center flex-1 cursor-pointer"
          >
            <Avatar 
            className="flex-1 aspect-1" 
            src={user.profimage ? `http://localhost:8000/api${user.profimage}` : defaultImg} 
            size="100%" 
            />
            <Box className="text-md <md:text-sm">{user.displayName}</Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
