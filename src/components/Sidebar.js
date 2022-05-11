import React from "react";
import SidebarOption from "./SidebarOption";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import Playlists from "./Playlists";

function Sidebar() {
  // console.log(playlists);

  return (
    <Container>
      <div className="top__links">
        <img
          className="logo"
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
          alt=""
        />
      </div>
      <ul>
        <li>
          <SidebarOption Icon={HomeIcon} option="Home" />
          <span>Home</span>
        </li>
        <li>
          <SidebarOption Icon={SearchIcon} option="Search" />
          <span>Search</span>
        </li>
        <li>
          <SidebarOption Icon={LibraryMusicIcon} option="Your Library" />
          <span>Your Library</span>
        </li>
      </ul>
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      <Playlists />
    </Container>
  );
}
const Container = styled.div`
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top__links {
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 1rem 0;
    }
    img {
      max-inline-size: 80%;
      block-size: auto;
    }
  }
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    li {
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: white;
      }
      span {
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
`;
export default Sidebar;
