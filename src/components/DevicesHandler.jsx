import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useDataLayerValue } from "../DataLayer";

function DevicesHandler() {
  const [{ token, availableDevices, currentlyPlaying, track }, dispatch] =
    useDataLayerValue();
  const setDevice = async (id) => {
    await axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${id}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        data: {
          context_uri: `spotify:album:${track.id}`,
          offset: {
            position: 5,
          },
          position_ms: 0,
        },
      }
    );
    dispatch({ type: "SET_DEVICE", currentDevice: id });
  };
  console.log(availableDevices);
  console.log(currentlyPlaying);
  console.log(track);

  return (
    <Container>
      <div className="icons"></div>
      {availableDevices?.map((device) => (
        <button onClick={() => setDevice(device.id)}>
          {(device?.type, device?.name)}
        </button>
      ))}
    </Container>
  );
}
const Container = styled.div`
  color: white;
  background-color: white;
`;

export default DevicesHandler;
