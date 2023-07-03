import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";
import Volume from "./Volume";
import Devices from "./Devices";
import { useDataLayerValue } from "../DataLayer";
import axios from "axios";
import ActualPlayer from "./ActualPlayer";

function Footer({ isOpen, setIsOpen }) {
  const [{ token, currentlyPlaying, currentDevice,playerState }, dispatch] =
  useDataLayerValue();
useEffect(() => {
  const getCurrentTrack = async () => {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data !== "") {
      const { item } = await response.data;
      const currentlyPlaying =  {
        id: item?.id,
        name: item?.name,
        artists: item?.artists?.map((artist) => artist.name),
        image: item?.album?.images[2]?.url,
      };
    await dispatch({ type: "CURRENTLY_PLAYING", currentlyPlaying });
    }
  };
getCurrentTrack();
},[currentlyPlaying]);
  return (
    <Container>
      <CurrentTrack currentlyPlaying={currentlyPlaying}/>
      <div className="footer__center">
      <PlayerControls />
      <ActualPlayer></ActualPlayer>
      </div>
      <div className="footer__right">
        <div>
          <Devices isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <Volume />
      </div>
    </Container>
  );
}
const Container = styled.div`
  background-color: #181818;
  height: 15vh;
  width: 100%;
  overflow: none;
  border-top: 1px solid #282828;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  padding: 0 1rem;
  z-index: 10;
  .footer__right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 3rem;
  }
  .footer__center{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
`;

export default Footer;
