import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useDataLayerValue } from "../DataLayer";

function CurrentTrack({currentlyPlaying}) {
  // console.log(currentlyPlaying,"CURRENTLYPLAYINH")
  return (
    <Container>
      {currentlyPlaying && currentlyPlaying?.image && (
        <div className="track">
          <div className="track__image">
            <img src={currentlyPlaying.image} alt="currentlyplaying" /> 
          </div>
          <div className="track__info">
            <h4>{currentlyPlaying?.name}</h4>
            <h6>{currentlyPlaying?.artists?.join(", ")}</h6>
          </div>
        </div>
      )}
    </Container>
  );
}
const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    img {
      width: 88%;
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      h4 {
        color: white;
        font-weight: 400;
        font-size: 14px;
      }
      h6 {
        color: #b3b3b3;
      }
    }
  }
`;
export default CurrentTrack;
