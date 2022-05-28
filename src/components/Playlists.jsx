import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDataLayerValue } from "../DataLayer";
import styled from "styled-components";

const Playlists = () => {
  const [{ token, playlists }, dispatch] = useDataLayerValue();
  const navigate = useNavigate();
  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlists = await items.map(({ name, id }) => {
        return { name, id };
      });
      dispatch({ type: "SET_PLAYLISTS", playlists });
    };

    getPlaylistData();
  }, [token, dispatch]);
  const changeCurrentPlaylist = async (selectedPlaylistId) => {
    await dispatch({ type: "SET_PLAYLIST_ID", selectedPlaylistId });
    navigate("/");
  };
  return (
    <Container>
      <ul>
        {playlists?.map(({ name, id }) => {
          return (
            <li key={id} onClick={() => changeCurrentPlaylist(id)}>
              {name}
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    height: 52vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    li {
      display: flex;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      font-size: 16px;
      &:hover {
        color: white;
      }
    }
  }
`;

export default Playlists;
