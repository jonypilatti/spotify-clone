import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar.jsx";
import Body from "./Body.jsx";
import Avatar from "./Avatar";
import { useDataLayerValue } from "../DataLayer.jsx";
import DevicesHandler from "./DevicesHandler.jsx";

function Player({ isOpen, setIsOpen}) {
  const [{ token, user }, dispatch] = useDataLayerValue();
  // console.log(user);
  const bodyRef = useRef();
  const [navbar, setNavbar] = useState(false);
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 30
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
    bodyRef.current.scrollTop >= 30 ? setNavbar(true) : setNavbar(false);
    bodyRef.current.scrollTop >= 268 ? setNavbar(true) : setNavbar(false);
  };
  useEffect(() => {
    localStorage.setItem("spotify.access_token", token);
    localStorage.setItem("spotify.user", JSON.stringify(user));
  }, [token, user]);
  return (
    <Container>
        <div className="player__body">
          <Sidebar />
          <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
            <div className="body__avatar" ref={bodyRef} onScroll={bodyScrolled}>
              <Avatar navBackground={navBackground} navbar={navbar} />
            </div>
            <div className="body__contents">
              <Body headerBackground={headerBackground} />
            </div>
            {isOpen == true ? (
              <div className="devices">
                <DevicesHandler
                  style={{ transition: "0.4s ease-in-out" }}
                ></DevicesHandler>
              </div>
            ) : null}
          </div>
        </div>
    </Container>
  );
}
const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  display: grid;
  grid-template-rows: 86vh;
  overflow-x: hidden;
  overflow-y: scroll;
    &::-webkit-scrollbar {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.6) !important;
  }
  &::-webkit-scrollbar-track {
    opacity: 0.1 !important;
  }
  .player__body {
    display: grid;
    grid-template-columns: 17.62vw 82.8vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
    .body {
      z-index: 0;
      height: 100%;
      width: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.7rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
  .body__avatar {
    position: sticky;
    align-self: flex-start;
    z-index: 10;
    background-color: ${({ navBackground }) =>
        navBackground ? "rgb(32, 87, 100)" : "transparent"};
    top: 0;
  }
  .footer {
    height: 85px;
    width: 100%;
    position: sticky;
    align-self: flex-start;
    bottom: 0;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
  }
  .devices {
    transition: 0.5s ease-in-out;
  }
`;

export default Player;
