import React, { useState } from "react";
import SidebarOption from "./SidebarOption";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import Playlists from "./Playlists";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  // console.log(playlists);
  const [selected, setSelected] = useState("off");
  const navigate = useNavigate();

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
        <li onClick={() => navigate("/")}>
          <SidebarOption Icon={HomeIcon} option="Home" />
        </li>
        <li onClick={() => navigate("/search")}>
          <SidebarOption Icon={SearchIcon} option="Search" />
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
  overflow: hidden;
  .top__links {
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 1.6rem 1.5rem;
    }
    img {
      cursor: pointer;
      max-inline-size: 54.7%;
      block-size: auto;
    }
  }
  .sidebar__title{
    margin-left:1rem;
  }
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    li {
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      margin: 0.35rem 0.3rem;
      svg {
        transform: scale(1.3);
        margin-bottom: 0.4rem;
      }
      &:hover {
        color: white;
      }
    }
  }
`;
export default Sidebar;
