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
    width: 7rem;
    border-radius: 2rem;
    height: 0.29rem;
    background: rgba(255, 255, 255, 0.6);
    -webkit-appearance: none;
    background-image: linear-gradient(#1db954, #1db954);
    background-repeat: no-repeat;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 90%;
    background: white;
    box-shadow: 0 0 2px 0 #555;
    transition: background 0.3s ease-in-out;
  }

  input::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    background-color: white;
    box-shadow: none;
    border-radius: 50%;
    border: none;
    background: transparent;
  }
  label {
    color: white;
    svg {
      opacity: 0.7;
    }
  }
`;

export default Volume;
