import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useDataLayerValue } from "../DataLayer";
import { Avatar } from "@mui/material";

function Navbar({ navBackground }) {
  const [{ user }, dispatch] = useDataLayerValue();
  return (
    <Container navBackground={navBackground}>
      <div className="search__bar">
        <SearchIcon />
        <input type="text" placeholder="Artists, songs or podcast" />
      </div>
      <div className="avatar">
        <a href="#">
          <Avatar alt={user?.display_name} src={user?.images[0]?.url} />
          <span>{user?.display_name}</span>
        </a>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navBackground }) =>
    navBackground ? "rgba(0,0,0,0.7)" : "none"};
  .search__bar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      height: 2rem;
      border: none;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.15rem;
    padding-right: 1rem;
    border-radius: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    &:hover {
      background-color: rgb(65, 65, 65);
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        white-space: nowrap;
        pointer-events: auto;
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;

export default Navbar;
