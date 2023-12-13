import "./settings.styles.scss";
import { ReactComponent as SettingsImg } from "~/images/settings.svg";

export const SettingsPage = () => {
  return (
    <div className="settingspage">
      <SettingsImg className="settingimage" />
      <button className="settingstitle">SETTINGS</button>
    </div>
  );
};
