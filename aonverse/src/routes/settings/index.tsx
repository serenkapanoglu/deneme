import { RouteSwitch } from "~/components/RouteSwitch";
import ContentPreferencesRoute from "./preferences";
import ReportBugRoute from "./bug";
import { Box } from "~/ui";
import DeleteAccountRoute from "./delete-account";
import { LinkList, LinkListItem } from "~/components/LinkList";
import { Navigate } from "react-router";
import Sidebar from "~/components/Sidebar";

export default function SettingsRoute() {
  return (
    <Box className="flex-1 flex flex-row">
      <Sidebar
        sidebarContent={
          <LinkList>
            <LinkListItem link="/settings/preferences">Content</LinkListItem>
            <LinkListItem link="/settings/bug">Report a bug</LinkListItem>
            <LinkListItem link="/settings/delete-account">
              Delete Account
            </LinkListItem>
          </LinkList>
        }
      >
        <RouteSwitch
          className="row-start-1 col-start-1"
          routes={[
            {
              key: "content",
              patterns: ["/settings/preferences"],
              Component: ContentPreferencesRoute,
            },
            {
              key: "bug",
              patterns: ["/settings/bug"],
              Component: ReportBugRoute,
            },
            {
              key: "delete-account",
              patterns: ["/settings/delete-account"],
              Component: DeleteAccountRoute,
            },
            {
              key: "fallback",
              patterns: ["/settings/*"],
              Component: () => <Navigate to="/settings/preferences" replace />,
            },
          ]}
        />
      </Sidebar>
    </Box>
  );
}
