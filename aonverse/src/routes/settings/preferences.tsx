import { useAsync } from "react-async-hook";
import { Container } from "~/components/Container";
import Sidebar from "~/components/Sidebar";
import { aon } from "~/sdk";
import { Box, Chip, Field, Text } from "~/ui";
import { ContentIcon } from "~/util/icons";

export default function ContentPreferencesRoute() {
  const { result: preferences, execute: fetchPreferences } = useAsync(
    aon.getPreferences,
    [],
    {
      executeOnMount: true,
      executeOnUpdate: false,
    }
  );

  return (
    <Sidebar side={"right"}>
      <Container size={800}>
        <Box className="flex flex-col gap-[40px] py-[40px] w-full">
          <Box className="flex flex-row gap-[12px]">
            <ContentIcon className="w-[24px] h-[24px]" />
            <Text>Content Preferences</Text>
          </Box>

          <Field placeholder="Search tags or usernames" />

          <Box className="flex flex-col gap-[20px]">
            <Text>TAGS YOU FOLLOW</Text>
            <Box className="flex flex-row flex-wrap justify-start gap-[12px]">
              {preferences?.tags.map((x) => (
                <Chip
                  onDelete={async () => {
                    await aon.removeTag(x);
                    await fetchPreferences();
                  }}
                >
                  {x}
                </Chip>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Sidebar>
  );
}
