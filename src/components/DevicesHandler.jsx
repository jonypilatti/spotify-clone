import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useDataLayerValue } from "../DataLayer";

function DevicesHandler() {
  const [
    { token, availableDevices, currentlyPlaying, playbackState },
    dispatch,
  ] = useDataLayerValue();
  const setDevice = async (id) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player",
      { device_ids: [id], play: false },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  };

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
