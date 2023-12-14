import { Text } from "~/ui";
import { Box } from "~/ui";
import img from "./aonversLogo.png";
import { useTheme } from "../Theme";

export function Logo(props: { showBeta?: boolean; size?: number }) {
  const { showBeta, size = 418 } = props;
  const theme = useTheme();

  return (
    <Box className={"flex-col gap-12px items-center"}>
      <img
        src={img}
        width={size}
        style={{ filter: theme.mode === "light" ? "invert(100)" : undefined }}
      />
      {showBeta && <Text style={{ opacity: 0.1 }}>Beta</Text>}
    </Box>
  );
}
