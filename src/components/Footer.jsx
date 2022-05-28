import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";
import Volume from "./Volume";
import Devices from "./Devices";

function Footer({ isOpen, setIsOpen }) {
  return (
    <Container>
      <CurrentTrack />
      <PlayerControls />
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
  height: 100%;
  width: 100%;
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
`;

export default Footer;
