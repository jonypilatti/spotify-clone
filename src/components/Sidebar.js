import React, { useState } from "react";

import SidebarOption from "./SidebarOption";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import Playlists from "./Playlists";

function Sidebar() {
  // console.log(playlists);
  const [selected, setSelected] = useState("off");

  return (
    <Container>
      <div className="top__links">
        <a href="#">
          <img
            className="logo"
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
            alt=""
          />
        </a>
      </div>
      <ul>
        <li>
          <SidebarOption
            Icon={HomeIcon}
            option="Home"
            onClick={() => {
              setSelected("on");
            }}
          />
        </li>
        <li>
          <SidebarOption
            Icon={SearchIcon}
            onClick={() => {
              setSelected("on");
            }}
            option="Search"
          />
        </li>
        <li>
          <SidebarOption
            Icon={LibraryMusicIcon}
            onClick={() => {
              setSelected("on");
            }}
            option="Your Library"
          />
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
      margin: 2rem 2rem;
    }
    img {
      cursor: pointer;
      max-inline-size: 54.7%;
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
      margin: 0.5rem 1.1rem;
      svg {
        transform: scale(1.65);
      }
      &:hover {
        color: white;
      }
    }
  }
`;
export default Sidebar;
