import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useDataLayerValue } from "../DataLayer";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

import VolumeDownIcon from "@mui/icons-material/VolumeDown";

function Volume() {
  const [{ token }, dispatch] = useDataLayerValue();
  const setVolume = async (e) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  };
  const volume = parseInt(document.getElementById("volume")?.value);
  // console.log(volume);

  return (
    <Container>
      <label for="volume">
        {volume === 0 ? (
          <VolumeOffIcon />
        ) : 0 < volume && volume <= 30 ? (
          <VolumeMuteIcon />
        ) : 30 < volume && volume <= 70 ? (
          <VolumeDownIcon />
        ) : (
          <VolumeUpIcon />
        )}
      </label>
      <input
        type="range"
        id="volume"
        min={0}
        max={100}
        onMouseUp={(e) => setVolume(e)}
      />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  input {
    margin-right: 2rem;
    width: 10rem;
    border-radius: 2rem;
    height: 0.5rem;
  }
  label {
    color: white;
  }
`;

export default Volume;
