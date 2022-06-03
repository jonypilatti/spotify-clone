import React from "react";
import styled from "styled-components";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function AvatarDropdown() {
  const LogOutHandler = () => {
    localStorage.clear();
    window.location.replace("");
  };
  return (
    <Container>
      <ul>
        <li
          onClick={() =>
            window.location.replace(
              "https://www.spotify.com/bo/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=your_account"
            )
          }
        >
          Account
          <BsBoxArrowUpRight style={{ color: "white" }} />
        </li>
        <li>Profile</li>
        <li onClick={() => LogOutHandler()}>Log out</li>
      </ul>
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #282828;
  border: none;
  border-radius: 4px;
  box-shadow: 0 16px 24px rgb(0 0 0 / 30%), 0 6px 8px rgb(0 0 0 / 20%);
  padding: 4px;
  max-width: 350px;
  min-width: 120%;
  overflow-y: auto;
  cursor: pointer;
  height: 190px;
  gap: 0px;
  ul {
    display: flex;
    text-align: start;
    flex-direction: column;
    justify-content: center;
    padding: 4px;
    position: relative;
    list-style-type: none;
    width: 100%;
    flex: 1;
    overflow: hidden;
    gap: 0px;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
    height: 60px;
    padding: 10px;
    font-weight: 500;
    border-radius: 2px;
    border: 0;
    color: rgba(255, 255, 255, 0.9);
    text-transform: none;
    letter-spacing: -0.02em;
    gap: 0px;
    svg {
      font-size: 1.6rem;
      color: rgba(255, 255, 255, 1);
      background: transparent;
    }
    &:hover {
      background-color: hsla(0, 0%, 100%, 0.1);
    }
  }
`;
export default AvatarDropdown;
