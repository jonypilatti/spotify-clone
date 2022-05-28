import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IconContext } from "react-icons";
import { useDataLayerValue } from "../DataLayer";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar";
import AvatarPlayButton from "./AvatarPlayButton";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import AvatarDropdown from "./AvatarDropdown";

function Navbar({ navBackground, navbar, setFilter }) {
  const [{ user }, dispatch] = useDataLayerValue();
  const navigate = useNavigate();
  const [avatarDisplay, setAvatarDisplay] = useState(false);

  return (
    <Container navBackground={navBackground}>
      <div className="buttoncontroller">
        <IoIosArrowBack className="buttons" onClick={() => navigate(-1)} />

        <IoIosArrowForward className="buttons" onClick={() => navigate(+1)} />
        {window.location.pathname === "/" ? (
          <AvatarPlayButton navbar={navbar}></AvatarPlayButton>
        ) : null}
        {window.location.pathname === "/search" ? (
          <Searchbar setFilter={setFilter}></Searchbar>
        ) : null}
      </div>
      <div
        className="avatar"
        onClick={() =>
          avatarDisplay == true
            ? setAvatarDisplay(false)
            : setAvatarDisplay(true)
        }
      >
        <a href="#">
          <Avatar alt={user?.display_name} src={user?.images[0]?.url} />
          <span>{user?.display_name}</span>
          {avatarDisplay == false ? (
            <IoMdArrowDropdown className="avatarDropdown" />
          ) : (
            <IoMdArrowDropup className="avatarDropdown" />
          )}
        </a>
        {avatarDisplay == true ? (
          <div className="dropdownSVG">
            <AvatarDropdown></AvatarDropdown>
          </div>
        ) : null}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: flex-start;
  padding: 2rem;
  transition: 0.3s ease-in-out;
  block-size: 4rem;
  width: 100%;
  background-color: ${({ navBackground }) =>
    navBackground ? "rgb(32, 87, 100)" : "transparent"};
  .buttoncontroller {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    justify-content: center;
    .buttons {
      padding: 2.5px;
      align-items: center;
      align-self: center;
      cursor: pointer;
      color: white;
      border-radius: 600px 600px 600px 600px;
      height: 33px;
      width: 33px;
      background-color: black;
      word-break: break-word;
      svg {
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.15rem;
    padding-right: 0.5rem;
    border-radius: 23px;
    display: flex-end;
    justify-content: center;
    align-items: center;
    height: 2.8rem;
    border: none;
    transform: scale(0.7);
    font-size: 20px;
    margin-left: 1.5rem;
    margin-right: -2.6rem;
    &:hover {
      background-color: rgb(65, 65, 65);
    }
    .dropdownSVG {
      display: flex;
      margin-top: 1rem;
      right: 5rem;
      position: relative;
      width: 120%;
      justify-content: flex-start;
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.6rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      .avatarDropdown {
        position: relative;
        background-color: transparent;
        font-size: 32px;
        color: white;
        align-items: flex-start;
      }
      svg {
        white-space: nowrap;
        pointer-events: auto;
        background-color: #282828;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;

export default Navbar;
