import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";

function Sidebar() {
  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="spotify logo"
      />
      <SidebarOption title="Home" Icon={HomeIcon} />
      <SidebarOption title="Search" Icon={SearchIcon} />
      <SidebarOption title="Your Library" Icon={LibraryMusicIcon} />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      <SidebarOption title="Hip hop" />
      <SidebarOption title="Rock" />
    </div>
  );
}

export default Sidebar;
