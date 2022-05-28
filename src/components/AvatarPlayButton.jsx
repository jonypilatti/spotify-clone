import axios from "axios";
import React, { useRef, useState } from "react";
import { IconContext } from "react-icons";
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs";
import styled from "styled-components";
import { useDataLayerValue } from "../DataLayer";

function AvatarPlayButton({ navbar }) {
  const [{ token, playerState }, dispatch] = useDataLayerValue();
  const playHandler = async () => {
    const state = playerState ? "pause" : "play";
    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "SET_PLAYER_STATE", playerState: !playerState });
  };

  return (
    <Container navbar={navbar}>
      {playerState ? (
        <IconContext.Provider
          navbar={navbar}
          value={{
            size: "50px",
            color: "#1ed760",
          }}
        >
          <BsFillPauseCircleFill onClick={() => playHandler()} />
        </IconContext.Provider>
      ) : (
        <IconContext.Provider
          value={{
            size: "50px",
            color: "#1ed760",
          }}
        >
          <BsFillPlayCircleFill onClick={() => playHandler()} />
        </IconContext.Provider>
      )}
    </Container>
  );
}
const Container = styled.div`
  align-self: center;
  cursor: pointer;
  background-color: black;
  border-radius: 600px 600px 600px 600px;
  height: 50px;
  display: ${({ navbar }) => (navbar ? "block" : "none")};
`;

export default AvatarPlayButton;
