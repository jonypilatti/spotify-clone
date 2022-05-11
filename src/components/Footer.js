import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "../DataLayer";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import styled from "styled-components";
import { Grid, Slider } from "@mui/material";
import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";
import Volume from "./Volume";
import axios from "axios";
import Devices from "./Devices";
import DevicesHandler from "./DevicesHandler";

function Footer() {
  return (
    <Container>
      <CurrentTrack />
      <PlayerControls />
      <div className="footer__right">
        <Devices />
        <DevicesHandler />
        <Volume />
      </div>
    </Container>
  );
}
const Container = styled.div`
  background-color: #181818;
  height: 100%;
  width: 100%;
  border-top: 1px solid #282828;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  padding: 0 1rem;
  .footer__right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 3rem;
  }
`;

export default Footer;
