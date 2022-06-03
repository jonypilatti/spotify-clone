import React, { useState } from "react";
import styled from "styled-components";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useDataLayerValue } from "../DataLayer";
import axios from "axios";
import { RiRepeatOneFill } from "react-icons/ri";

function PlayerControls() {
  const [{ token, playerState, repeatState, shuffleState }, dispatch] =
    useDataLayerValue();
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState("off");

  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
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
      const { item } = response.data;
      const currentlyPlaying = {
        id: item.id,
        name: item.name,
        artists: item.artists.map((artist) => artist.name),
        image: item.album.images[2].url,
      };
      dispatch({ type: "CURRENTLY_PLAYING", currentlyPlaying });
    } else dispatch({ type: "SET_PLAYING", currentlyPlaying: null });
  };
  const shuffleMode = async () => {
    if (shuffle == false) {
      setShuffle(true);
    } else if (shuffle == true) {
      setShuffle(false);
    }
    await axios.put(
      `https://api.spotify.com/v1/me/player/shuffle?state=${shuffle}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "SET_SHUFFLE", shuffleState });
  };
  const repeatMode = async () => {
    if (repeat == "off") {
      setRepeat("track");
    } else if (repeat == "track") {
      setRepeat("context");
    } else if (repeat == "context") {
      setRepeat("off");
    }
    await axios.put(
      `https://api.spotify.com/v1/me/player/repeat?state=${repeat}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "SET_REPEAT", repeatState });
  };
  const changeState = async () => {
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
  console.log(playerState);
  return (
    <Container>
      <div className="shuffle">
        {shuffle == false ? (
          <BsShuffle onClick={() => shuffleMode()} />
        ) : (
          <BsShuffle style={{ color: "green" }} onClick={() => shuffleMode()} />
        )}
      </div>
      <div className="previous">
        <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
      </div>
      <div className="state">
        {playerState ? (
          <BsFillPauseCircleFill onClick={() => changeState()} />
        ) : (
          <BsFillPlayCircleFill onClick={() => changeState()} />
        )}
      </div>
      <div className="next">
        <CgPlayTrackNext onClick={() => changeTrack("next")} />
      </div>
      <div className="repeat">
        {repeat == "off" ? (
          <FiRepeat onClick={() => repeatMode()} />
        ) : repeat == "track" ? (
          <FiRepeat style={{ color: "green" }} onClick={() => repeatMode()} />
        ) : (
          <RiRepeatOneFill
            style={{ color: "green" }}
            onClick={() => repeatMode()}
          />
        )}
      </div>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  svg {
    color: #b3b3b3;
    transition: 0.1s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .shuffle {
    transform: scale(1.1);
  }
  .repeat {
    transform: scale(1.1);
  }
  .state {
    svg {
      color: white;
    }
  }
  .previous,
  .next,
  .state {
    transform: scale(1.1);
    font-size: 2rem;
  }
`;

export default PlayerControls;
