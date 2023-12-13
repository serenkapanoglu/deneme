import { Container } from "~/components/Container";
import Sidebar from "~/components/Sidebar";
import { Box, Button, Field, Text, TextArea } from "~/ui";
import { BugIcon } from "~/util/icons";

export default function ReportBugRoute() {
  return (
    <Sidebar side={"right"}>
      <Container size={800}>
        <Box className="flex flex-col gap-[20px] py-[40px] w-full">
          <Box className="flex flex-row gap-[12px]">
            <BugIcon className="w-[24px] h-[24px]" />
            <Text>Report a bug</Text>
          </Box>
          <Text>Tell us what we could do to improve</Text>
          <Box className="flex flex-col gap-[12px]">
            <Text className="text-sm opacity-60">EMAIL (OPTIONAL)</Text>
            <Field />
          </Box>
          <Box className="flex flex-col gap-[12px]">
            <Text className="text-sm opacity-60">WHAT IS THE BUG?</Text>
            <TextArea rows={5} />
          </Box>
          <Box className="flex flex-row items-center justify-end">
            <Button variant="contained">Send</Button>
          </Box>
        </Box>
      </Container>
    </Sidebar>
  );
}
