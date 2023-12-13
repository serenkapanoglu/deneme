import { Avatar, Box, Button, Text } from "~/ui";

export default function SupportCard(props: {
  support: SupportData;
  onUnsupport?: () => void;
}) {
  const { support, onUnsupport } = props;

  return (
    <Box className="rounded-lg border-1 border-solid border-[var(--color-divider)] p-4 flex flex-row gap-2">
      <Box>
        <Avatar src={support?.supported.profimage} size={80} />
      </Box>
      <Box className="flex-1 flex flex-row items-center">
        <Box className="flex flex-col flex-1 gap-1">
          <Text>{support?.supported.displayName}</Text>
          <Text className="opacity-60 text-sm">${support?.amount} Monthly</Text>
        </Box>
        <Box>
          <Button className="min-w-0 text-xs" onClick={onUnsupport}>
            Unsupport
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
