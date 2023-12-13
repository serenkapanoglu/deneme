import { Routes, Route } from "react-router-dom";
import { HeaderMain } from "~/Navbar/headermain.component";
import { MyHomePage } from "./userhomepage.component.jsx";
import { SettingsPage } from "~/UserSettings/settings.components";
import { AchievementsPage } from "~/Achievments/achievements.component";
import { ContentPrefPage } from "~/ContentPreference/contentprefpage.component";
import { ReportBugPage } from "~/ReportBug/reportbugpage.component";
import { LayoutPage } from "~/layoutpage.component";
import { VotingPage } from "~/Voting/votingpage.component";
import { OtherUser } from "~/VisitUser/otheruserpage.component";

export const UserProfile = () => {
  return (
    <Routes>
      <Route path="/" element={<HeaderMain />}>
        <Route index element={<MyHomePage />} />
        <Route path="achievements" element={<AchievementsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="contentpreference" element={<ContentPrefPage />} />
        <Route path="reportbug" element={<ReportBugPage />} />
        <Route path="layout" element={<LayoutPage />} />
        <Route path="voting" element={<VotingPage />} />
        <Route path="otheruser" element={<OtherUser />} />
      </Route>
    </Routes>
  );
};
