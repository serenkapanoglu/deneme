import "./contentprefpage.styles.scss";
import { ReactComponent as AddSign } from "~/images/add.svg";
import { ContentPrefDropDown } from "~/Navbar/dropdown.component";

export const ContentPrefPage = () => {
  return (
    <div className="contentprefpage">
      <div className="contentprefheader">
        <AddSign className="addsignimg" />
        <button className="contentpreftitle">CONTENT PREFERENCES</button>
      </div>
      <div className="contentprefitem">
        <span>NSFW FILTER</span>
        <ContentPrefDropDown />
        <input
          className="contentprefsearch"
          type="search"
          placeholder="Search tags or usernames"
        />
      </div>
      <div>
        <span className="contentpreftagssec">TAGS YOU FOLLOW</span>
        <span className="contentprefusersec">USERS YOU FOLLOW</span>
      </div>
    </div>
  );
};
