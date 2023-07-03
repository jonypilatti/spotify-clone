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
  const rangeInputs = document.querySelectorAll('input[type="range"]')

function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('volume')
  } 
  const min = target.min
  const max = target.max
  const val = target.value
  
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

rangeInputs?.forEach(input => {
  input.addEventListener('input', handleInputChange)
})

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
        onChange={(e) =>  setVolume(e) && handleInputChange(e)}
      />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  input[type="range"] {
  -webkit-appearance: none;
  margin-right: 15px;
  width: 6.1rem;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  background-image: linear-gradient(white, white);
  background-size: 50% 100%;
  background-repeat: no-repeat;

}
input[type="range"]:hover{
  background-image: linear-gradient(#1db954, #1db954);
  background-size: 50% 100%;
  background-repeat: no-repeat;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    display:block;
}
&::-webkit-slider-runnable-track{
  display:block;
}
}
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 12px;
    width: 12px;
    border-radius: 90%;
    background: white;
    box-shadow: 0 0 2px 0 #555;
    transition: background 0.3s ease-in-out;
   display:none;
  }

  input::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    display:none;
    box-shadow: none;
    border-radius: 20%;
    border: none;
    width:100%;
    &:hover{
      display:block;
    }
  }

  label {
    color: white;
    svg {
      opacity: 0.7;
    }
  }
`;

export default Volume;
