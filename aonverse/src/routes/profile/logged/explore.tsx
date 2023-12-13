import { Container } from "~/components/Container";
import { aon } from "~/sdk";
import Feed from "~/components/Feed";
import { Box } from "~/ui";

//EXPLORE PAGE
export default function ExploreRoute() {

  return (
    <Box className="flex-1 w-full">
      <Container size={800} className="py-[56px] gap-[40px]">
        <Feed fetcher={aon.getExploreFeed} />
      </Container>
    </Box>
  );
}
